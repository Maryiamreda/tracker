import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

type ItemsData = {   
    cost: number,
    details: string,
}

type ReceiptData = {
    headline: string,
    items: ItemsData[] 
}

 async function getUserReceipts(UserId: number){
    try{
        const receipts = await db.select()
        .from(schema.receiptTable).where(eq(schema.receiptTable.ownerId, UserId));
        return receipts;
    
    }catch(err){
        console.error("Error fetching user receipts:", err);
        throw err;
    }
 }


async function addNewReceipt(receiptData: ReceiptData, userId: number ){
try{
   
    const newReceipt = await db.insert(schema.receiptTable).values({
        headline: receiptData.headline,
        ownerId: userId
    })
    .returning();

const itemsToInsert = receiptData.items.map(item => ({
            cost: item.cost,
            details: item.details, 
            receiptId: newReceipt[0].id 
        }));
const newItems = await db.insert(schema.receiptItemsTable).values(itemsToInsert)
        .returning();

    return {
        success: true,
data: {
                receipt: newReceipt[0],
                items: newItems
            }
            };
}catch(err){
    console.error("Error fetching user receipts:", err);
    throw err;
}
}

export {addNewReceipt ,getUserReceipts }