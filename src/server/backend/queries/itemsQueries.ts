import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { addTagAndLinkToItem, getItemTags } from "./tagsQueries";
import { Item, Tag } from "@/app/types/types";





export async function getReceiptItems(receiptId: number) {
  try{

const receiptItems=await db.select(
{
  itemId: schema.receiptItemsTable.id,
        itemDetails: schema.receiptItemsTable.details,
        itemCost: schema.receiptItemsTable.cost,
        tagId: schema.tagsTable.id,
        tagName: schema.tagsTable.name,
        tagIcon: schema.tagsTable.icon,
}


 
).from(schema.receiptItemsTable)
 .leftJoin(
        schema.itemsToTagsTable, 
        eq(schema.receiptItemsTable.id, schema.itemsToTagsTable.itemId) //we get all items exist in the itemsToTagsTable table
      )
      .leftJoin(schema.tagsTable,eq(schema.tagsTable.id,schema.itemsToTagsTable.tagId)) //we match them to get their respomeive tags ? 
.where(eq(schema.receiptItemsTable.receiptId,receiptId)); // then we execulde only who have the parent reciept


    const items: any[] = []; // i should use map here will come back later 
receiptItems.forEach(row => {
      // Find existing item or create new one
      let existingItem = items.find(item => item.id === row.itemId);
      if (!existingItem) {
        existingItem = {
          id: row.itemId,
          details: row.itemDetails,
          cost: row.itemCost,
          tags: []
        };
        items.push(existingItem);
      }
      
      // Add tag if it exists
      if (row.tagId) {
        existingItem.tags.push({
          id: row.tagId,
          name: row.tagName,
          icon: row.tagIcon
        });
      }
    });

    return items;

  }catch(err){
     console.error("Error inserting receipt items:", err);
    throw err;
  }

}



export async function addReceiptItems(receiptId: number, receiptItems: Item[]) {
  try {
    const insertedItems = [];
    for (const item of receiptItems) {
        const [newItem] = await db.insert(schema.receiptItemsTable)
        .values({
          cost: item.cost,
          details: item.details,
          receiptId: receiptId
        })
        .returning();
        insertedItems.push(newItem);

    for (const tagId of item.tags) {
      console.log("tag adding in item query",tagId)
      // await addTagAndLinkToItem(tagId ,itemId);
      await db.insert(schema.itemsToTagsTable).values({
       itemId: newItem.id,
       tagId: tagId
        });
}

    }
  } catch (err) {
    console.error("Error inserting receipt items:", err);
    throw err;
  }
}