"use server";

import { Item, ReceiptData, Tag } from "@/app/types/types";
import { getUserFromSession } from "@/lib/session";
import { addNewReceipt } from "@/server/backend/queries/receiptsQueries";
import { redirect } from "next/navigation";
import { string, z } from "zod";
import AddTag from "./AddTagForm";
import { addTag } from "@/server/backend/queries/tagsQueries";


const tagsSchema = z.object({

  name: z.string().trim()
    .min(1, { message: "Name is required" }),
    icon:z.string().min(1, { message: "icon is required" }),

});

export async function addNewTag(prevState: any,formData: FormData){
    const result=tagsSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
  return {
    errors: {
      name: result.error.flatten().fieldErrors.name,
      icon: result.error.flatten().fieldErrors.icon,

       },
     };
    }
      const { name,icon} = result.data;
const tag: Tag = { 
  id: Math.random() ,
  name, 
  icon, 
  isEssential: false 
};

try{
    const response = await addTag(tag , undefined);
     if (!response) {
      // Return specific error messages from backend
      return {
        errors: {
          email: [response],
        },
      };
    }
return response
}catch(error){
        console.error("Error adding tag:", error);

}
}