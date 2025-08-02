import { Tag } from "@/app/types/types";
import { db } from "..";
import * as schema from '../db/schema';
import { eq, and, or } from 'drizzle-orm';
import { getUserFromSession } from "@/lib/session";

 

// async function getAuthenticatedUserId(){
//    const user = await getUserFromSession();

//   if (!user?.userId) {
//        return { undefined }; 
//   }
//   let userId=user?.userId;
//   return userId
// }
  

export async function getUserTags(){
try{
   const user = await getUserFromSession();

  if (!user?.userId) {
       return { error: "User not found" }; 
  }
  let userId=user?.userId;

      const tags = await db.select().from(schema.tagsTable).where( or(eq(schema.tagsTable.ownerId, userId) , eq(schema.tagsTable.isEssential, true)
 ) );
            return{
              data:tags
            }
}catch(error){
    console.error("Error fetching tags:", error);
    return { error: "Failed to fetch tags" };
}
}

// export async function getItemTags(itemId: number) {
//   try {
//     // Single query with JOIN instead of multiple queries
//     const itemTags = await db
//       .select({
//         id: schema.tagsTable.id,
//         name: schema.tagsTable.name,
//         icon: schema.tagsTable.icon,
//       })
//       .from(schema.itemsToTagsTable)
//       .innerJoin(
//         schema.tagsTable, 
//         eq(schema.itemsToTagsTable.tagId, schema.tagsTable.id)
//       )
//       .where(eq(schema.itemsToTagsTable.itemId, itemId));
      
// return { data: itemTags };
//   } catch (error) {
//     console.error("Error fetching item tags:", error);
//     return { error: "Failed to fetch item tags" };
//   }
// }


export async function addTag(tag: Tag, itemId: number  | undefined) {
try {
   const user = await getUserFromSession();

  if (!user?.userId) {
       return {  error: "User not found" }; 
  }
let userId=user?.userId;
 const existingTagId = await tagExists(tag , userId);
    if (existingTagId) 
      return { error:'tag already exists ' };
    
const [newTag] = await db.insert(schema.tagsTable).values({name:tag.name , icon:tag.icon , isEssential:tag.isEssential , ownerId:userId}).returning();
if (itemId !== undefined)
{    
const linkResult = await linkTagToItem(newTag.id, itemId);
 if (linkResult && typeof linkResult === 'object' && 'error' in linkResult) {
        // Tag was created but linking failed - log warning but still return success
        console.warn(`Tag created but failed to link to item ${itemId}:`, linkResult.error);
      }
}  
 
    return  {data:newTag}
  } catch (error) {
    console.error("Error Adding tag:", error);
    return { error: "Failed to add tag" };
  }
}

 async function tagExists(tag: Tag , userId:number) {
  try{

    const [existingTag] = await db.select({ id: schema.tagsTable.id })
      .from(schema.tagsTable)
      .where(
        and(
          eq(schema.tagsTable.name, tag.name),
          or(eq(schema.tagsTable.ownerId, userId),eq(schema.tagsTable.isEssential, true))
          
        )
      ).limit(1);

     return existingTag?.id || null;

  }catch(error){
    console.error("Error checking if tag exists:", error);
    return null;
  }
}



export async function linkTagToItem(tagId: number, itemId: number) {
  try{
  await db.insert(schema.itemsToTagsTable).values({
      itemId,
      tagId
    });
  }catch(error){
    console.error("Error linking tag to item:", error);
    return error
  }
}

