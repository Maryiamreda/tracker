import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

type ReceiptData={
    headline:string,
    total?:number,
    // userId:string
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
async function addNewReceipt(receiptData:ReceiptData , userId:number){
try{
    if(!receiptData.headline) return{
        success: false, message: "headline is required" 
    }


    const newReceipt = await db.insert(schema.receiptTable).values({
        headline: receiptData.headline,
        total: receiptData.total,
        ownerId: userId
    })
    .returning();
    return {
        success: true,
        data: newReceipt[0]
    };
}catch(err){
    console.error("Error fetching user receipts:", err);
    throw err;
}
}