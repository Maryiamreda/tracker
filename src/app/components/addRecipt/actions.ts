"use server";

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
const result=receiptItemsSchema.safeParse(Object.fromEntries(formData));
if(!result.success){
    return{
 errors: {
        email: result.error.flatten().fieldErrors.email,
        password: result.error.flatten().fieldErrors.password,
        username: undefined,
      },    }
}
const result=receiptSchema.safeParse(Object.fromEntries(formData));

}



