import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { addTagAndLinkToItem, getItemTags } from "./tagsQueries";
import { Item, Tag } from "@/app/types/types";





// export async function getReceiptItems(receiptId: number) {
//   try{
// const items:Item[]=[]
// const receiptItems=await db.select().from(schema.receiptItemsTable).where(eq(schema.receiptItemsTable.receiptId,receiptId));
// for( const item of receiptItems ){

// }



//   }catch(err){
//      console.error("Error inserting receipt items:", err);
//     throw err;
//   }

// }

export async function getReceiptItems(receiptId: number) {
  try {
    const results = await db
      .select({
        itemId: schema.receiptItemsTable.id,
        details: schema.receiptItemsTable.details,
        cost: schema.receiptItemsTable.cost,
        tagId: schema.tagsTable.id,
        tagName: schema.tagsTable.name,
        isEssential: schema.tagsTable.isEssential,
      })
      .from(schema.receiptItemsTable)
      .leftJoin(schema.itemsToTagsTable, eq(schema.itemsToTagsTable.itemId, schema.receiptItemsTable.itemId))
      .leftJoin(schema.tagsTable, eq(schema.tagsTable.id, schema.itemsToTagsTable.tagId))
      .where(eq(schema.receiptItemsTable.receiptId, receiptId));

    // Grouping items with their tags
    const itemMap = new Map<number>();

    for (const row of results) {
      if (!itemMap.has(row.itemId)) {
        itemMap.set(row.itemId, {
          id: row.itemId.toString(),
          details: row.details,
          cost: row.cost,
          tags: [],
        });
      }

      if (row.tagId) {
        itemMap.get(row.itemId)?.tags.push({
          id: row.tagId,
          name: row.tagName,
          isEssential: row.isEssential,
          ownerId: null, // set if needed
          created_at: new Date(), // dummy value if needed
        });
      }
    }

    return Array.from(itemMap.values());

  } catch (err) {
    console.error("Error fetching receipt items with tags:", err);
    return [];
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