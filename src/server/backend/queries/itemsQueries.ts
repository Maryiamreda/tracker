import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { addTagAndLinkToItem } from "./tagsQueries";
import { Item, Tag } from "@/app/types";


export async function addReceiptItems(receiptId: number, receiptItems: Item[]) {
  try {
        const insertedItems = [];
    for (const item of receiptItems) {
        const [newItem] = await db.insert(schema.receiptItemsTable)
        .values({
          cost: item.cost,//error here 
          details: item.details,
          receiptId: receiptId
        })
        .returning();
        insertedItems.push(newItem);

       for (const tagId of item.tags) {
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