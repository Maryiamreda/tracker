"use server";

import { Item, ReceiptData, Tag } from "@/app/types/types";
import { getUserFromSession } from "@/lib/session";
import { addNewReceipt } from "@/server/backend/queries/receiptsQueries";
import { redirect } from "next/navigation";
import { string, z } from "zod";


const receiptItemsSchema = z.object({
  cost: z.number()
    .min(0.01, { message: "Cost is required and must be more than 0" }),
  details: z.string().trim()
    .min(1, { message: "Details is required" }),
  tags: z.array(z.number()).optional() 

});

const receiptSchema = z.object({
  headline: z.string().trim()
    .min(1, { message: "Headline is required" })
    .min(4, { message: "Headline must be at least 4 characters" }),
  items: z.array(receiptItemsSchema)
    .min(1, { message: "At least one item is required" }),
});


export async function addReceipt(prevState: any, formData: FormData) {
  
  const headline = formData.get("headline");
  const items: Item[] = [];

  let index = 0;
  while (true) {
    const details = formData.get(`items[${index}][details]`);
    const cost = formData.get(`items[${index}][cost]`);

    if (details === null && cost === null) break;

    if (typeof details === "string" && typeof cost === "string") { //why it work when cost is string while i specified that it has type number
      // Get all tags for this item
      const tags: number[] = [];

      for (const [key, value] of formData.entries()) {
        const tagPrefix = `items[${index}][tags]`;
        if (key === tagPrefix && typeof value === "string") {
          tags.push(Number(value));
        }
      }

      items.push({
        details: details.trim(),
        cost: parseFloat(cost),
        tags
      });
    }

    index++;
  }

  const parsedData = receiptSchema.safeParse({ headline, items });
  if (!parsedData.success) {
    return { error: parsedData.error.format() }; //error handling here 
  }

  try {
   
// Transform the parsed data to match ReceiptData interface
    const receiptData: ReceiptData = {
      headline: parsedData.data.headline,
      items: parsedData.data.items.map(item => ({
        details: item.details,
        cost: item.cost,
        tags: item.tags || []
      }))
    };


    const response = await addNewReceipt(receiptData);
    return { success: true, data: response.data };
  } catch {
    return { error: "Server error. Please try again." };
  }
}




