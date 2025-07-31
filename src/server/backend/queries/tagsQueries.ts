import { Tag } from "@/app/types/types";
import { db } from "..";
import * as schema from '../db/schema';
import { eq, and, or } from 'drizzle-orm';



export async function getUserTags(UserId: number){
try{
      const tags = await db.select()
            .from(schema.tagsTable).where( or(eq(schema.tagsTable.ownerId, UserId) ,     eq(schema.tagsTable.isEssential, true)
 ) );
 console.log(tags);
            return{
              data:tags
            }
}catch(error){
    console.error("Error fetching tags:", error);
    return { data:[], error: "Failed to fetch tags" };
}
}


export async function addTagAndLinkToItem(tag: Tag, itemId?: number) {
  try{
     const tagResult = await addTag(tag); // handle duplication
    const tagId = tagResult.data?.id ?? tag.id; // fallback to tag.id if already exists
    if (typeof itemId === "undefined") {
  throw new Error("itemId is required to link tag to item");
}
  await db.insert(schema.itemsToTagsTable).values({
      itemId,
      tagId
    });
  }catch{}
}

export async function addTag(tag: Tag, itemId?: number) {
  try {
  if (tag.ownerId === null) {
  throw new Error("Tag must have a valid ownerId to check for duplicates.");
}
const existingTag = await db.select()
      .from(schema.tagsTable)
      .where(
        and(
          eq(schema.tagsTable.name, tag.name),
          eq(schema.tagsTable.ownerId, tag.ownerId)
        )
      );

    if (existingTag.length > 0) {
      return { message: "Tag already exists", data: existingTag[0] };
    }

    const newTag = await db.insert(schema.tagsTable).values(tag).returning();
    
    return { data: newTag[0] };
  } catch (error) {
    console.error("Error Adding tag:", error);
    return { error: "Failed to add tag" };
  }
}
