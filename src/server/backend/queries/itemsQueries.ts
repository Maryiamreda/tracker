import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

type ItemsData = {   
    cost: number,
    details: string,
    receiptId?: number
}

export async function addReceiptItems(receiptId: number, receiptItems: ItemsData[]) {
  try {
    const itemsToInsert = receiptItems.map(item => ({
      cost: item.cost,
      details: item.details,
      tags:item.tags[],
      receiptId: receiptId,
      
    }));
if(items?.tag?) addTag(tags , itemid)
    const newItems = await db.insert(schema.receiptItemsTable).values(itemsToInsert).returning();

    return newItems;
  } catch (err) {
    console.error("Error inserting receipt items:", err);
    throw err;
  }
}