"use server";

import { Tag } from "@/app/types/types";
import { addTag } from "@/server/backend/queries/tagsQueries";
import { z } from "zod";

const tagsSchema = z.object({
    name: z.string().trim()
        .min(1, { message: "Name is required" }),
    icon: z.string().min(1, { message: "Icon is required" }),
});

export async function addNewTag(prevState: any, formData: FormData) {
    const result = tagsSchema.safeParse(Object.fromEntries(formData));
    
    if (!result.success) {
        return {
            errors: {
                name: result.error.flatten().fieldErrors.name,
                icon: result.error.flatten().fieldErrors.icon,
            },
        };
    }
    
    const { name, icon } = result.data;
    const tag: Tag = { 
        id: Math.random(),
        name, 
        icon, 
        isEssential: false 
    };
    
    try {
        const response = await addTag(tag, undefined);
        
        if (response?.error) {
            return {
                error: response.error,
            };
        }
        
        if (response?.data) {
            return {
                data: response.data,
                success: true,
            };
        }
        
        return {
            error: "Unknown error occurred",
        };
        
    } catch (error) {
        console.error("Error adding tag:", error);
        return {
            error: "Failed to add tag",
        };
    }
}