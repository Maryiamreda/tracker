"use server";

import { getUserFromSession } from "@/lib/session";
import { addNewReceipt } from "@/server/backend/queries/receiptsQueries";
import { redirect } from "next/navigation";
import { string, z } from "zod";


const receiptItemsSchema = z.object({
  cost: z.number()
    .min(0.01, { message: "Cost is required and must be more than 0" }),
  details: z.string().trim()
    .min(1, { message: "Details is required" })
});

const receiptSchema = z.object({
  headline: z.string().trim()
    .min(1, { message: "Headline is required" })
    .min(4, { message: "Headline must be at least 4 characters" }),
  items: z.array(receiptItemsSchema)
    .min(1, { message: "At least one item is required" })
});




export async  function addReceipt(prevState: any,formData: FormData){
  const headline = formData.get("headline");
const items: { cost: number; details: string }[] = [];
  let index = 0;
  while (true) {
    const details = formData.get(`items[${index}][details]`);
    const cost = formData.get(`items[${index}][cost]`);
    if (details === null && cost === null) break;

    if (typeof details === "string" && typeof cost === "string") {
      items.push({ 
        details: details.trim(), 
        cost: parseFloat(cost)
      });
    }
    index++;
  }
    const parsedData = receiptSchema.safeParse({ headline, items });
 if (!parsedData.success) {
    return { error: parsedData.error.format() };
  }
  

try{
     const user = await getUserFromSession();

if (!user) {
  return { error: "User not authenticated" };
}
const userId = user?.userId;

const response = await addNewReceipt(parsedData.data, userId);
    return { success: true, data: response.data };

    
    
}catch{
    return { error: "Server error. Please try again." };

}
}




