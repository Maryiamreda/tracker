import { Item, ReceiptData, Tag } from "@/app/types/types";
import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { addReceiptItems, getReceiptItems } from "./itemsQueries";
import { getUserFromSession } from "@/lib/session";


 async function getUserReceipts(){
    try{
       const user = await getUserFromSession();
        if (!user?.userId)   return { error: "User not authenticated" };
         const UserId=user?.userId;
        const receipts = await db.select()
        .from(schema.receiptTable).where(eq(schema.receiptTable.ownerId, UserId));
       const receiptsAndItems = [];
      for (const receipt of receipts) {
    const items = await getReceiptItems(receipt.id);
    receiptsAndItems.push({headline: receipt.headline, items});
}

        return {data:receiptsAndItems};
    
    }catch(err){
        console.error("Error fetching user receipts:", err);
        throw err;
    }
 }


async function addNewReceipt(receiptData: ReceiptData, userId: number | undefined ){
try{
if (typeof userId === "undefined") {
  return { error: "User not authenticated" };
}

const newReceipt = await db.insert(schema.receiptTable).values({
        headline: receiptData.headline,
        ownerId: userId
    })
    .returning();


const receiptId = newReceipt[0].id;
const newItems = await addReceiptItems(receiptId, receiptData.items);
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