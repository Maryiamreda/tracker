import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { DatabaseItem, Item } from "@/app/types/types";


export async function getReceiptItems(receiptId: number) {
  try{

const receiptItems=await db.select(
{
  itemId: schema.receiptItemsTable.id,
        itemDetails: schema.receiptItemsTable.details,
        itemCost: schema.receiptItemsTable.cost,
        itemReciept: schema.receiptItemsTable.receiptId,

        tagId: schema.tagsTable.id,
        tagName: schema.tagsTable.name,
        tagIcon: schema.tagsTable.icon,
} 
).from(schema.receiptItemsTable)
 .leftJoin(
        schema.itemsToTagsTable, 
        eq(schema.receiptItemsTable.id, schema.itemsToTagsTable.itemId) //we get all items exist in the itemsToTagsTable table
      )
      .leftJoin(schema.tagsTable,eq(schema.tagsTable.id,schema.itemsToTagsTable.tagId)) //we match them to get their responsive tags ? 
.where(eq(schema.receiptItemsTable.receiptId,receiptId)); // then we execulde only who have the parent reciept

const items: DatabaseItem[]= []; // i should use map here will come back later 

receiptItems.forEach(receiptItem => {
      // Find existing item or create new one
      let existingItem = items.find(item => item.id === receiptItem.itemId);
      if (!existingItem) {
        existingItem = {
          id: receiptItem.itemId,
        receiptId: receiptItem.itemReciept,

          details: receiptItem.itemDetails,
          cost: receiptItem.itemCost,
          tags: []
        };
        items.push(existingItem);
      }
      
      // Add tag if it exists
      if (receiptItem.tagId && receiptItem.tagName) {
        existingItem.tags.push({
          id: receiptItem.tagId,
          name: receiptItem.tagName,
          icon: receiptItem.tagIcon
        });
      }
    });
// console.log(items , items[0].tags[0].name)
    return {data:items};

  }catch(error){
     console.error("Error fetching receipt items:", error);
    return { error: "Failed to fetch receipt items" };
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
      // await addTagAndLinkToItem(tagId ,itemId);
      await db.insert(schema.itemsToTagsTable).values({
       itemId: newItem.id,
       tagId: tagId
        });
}

    }

 return {data:insertedItems}   
  } catch (err) {
    console.error("Error inserting receipt items:", err);
    return { error: "Failed to fetch receipt items" };
  }
}