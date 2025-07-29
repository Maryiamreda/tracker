import { db } from "..";
import * as schema from '../db/schema';
import { eq ,or } from 'drizzle-orm';



export async function getUserTags(UserId: number){
try{
      const tags = await db.select()
            .from(schema.tagsTable).where( or(eq(schema.tagsTable.ownerId, UserId) ,     eq(schema.tagsTable.isEssential, true)
 ) );
 console.log(tags)
            return{
              data:tags
            }
}catch(error){
    console.error("Error fetching tags:", error);
    return { data:[], error: "Failed to fetch tags" };
}
}