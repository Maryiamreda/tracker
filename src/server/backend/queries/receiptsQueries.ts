import { ReceiptData } from "@/app/types/types";
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
    
    }catch(error){
        console.error("Error fetching user receipts:", error);
    return { error: "Error fetching user receipts" };
    }
 }


async function addNewReceipt(receiptData: ReceiptData, ){
try{
 const user = await getUserFromSession();
    if (!user) {
      return { error: "User not authenticated" };
    }
  let userId=user?.userId;

const total = receiptData.items.reduce((sum, item) => sum + item.cost, 0);
const newReceipt = await db.insert(schema.receiptTable).values({
        headline: receiptData.headline,
        total:total,
        ownerId: userId
    })
    .returning();


const receiptId = newReceipt[0].id;
const newItems = await addReceiptItems(receiptId, receiptData.items);

console.log( newReceipt[0],
                newItems)
    return {
        success: true,
          data: {
                receipt: newReceipt[0],
                items: newItems
                }
            };
}catch(err){
    console.error("Error adding new receipt:", err);
    return { error: "Error adding new receipt" };
}
}

export {addNewReceipt ,getUserReceipts }