"use server";

import { createSession } from "@/server/auth";
import { userLogin } from "@/server/backend/queries/userQueries";
import { redirect } from "next/navigation";
import { string, z } from "zod";

const signInSchema=z.object({
email:z.string().email({ message: "Invalid email address" }).trim(),
 password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
})

export async  function signIn(prevState: any,formData: FormData){
const result=signInSchema.safeParse(Object.fromEntries(formData));
if(!result.success){
    return{
              errors: result.error.flatten().fieldErrors,
    }
}
    const{email,password}=result.data
    let userId;
try{
const response=await userLogin({email,password});
if (!response.success) {
      // Return specific error messages from backend
      return {
        errors: {
          email: [response.message],
        },
      };
    }

   if (!response.data || !response.data.user || !response.data.user.id) {
      console.error("Unexpected response structure:", response);
      return {
        errors: {
          username: ["Server returned unexpected data. Please try again."],
        },
      };
    }
        userId = String(response.data.user.id);

}catch(err){
    console.error("Error Logging to account:", err);
    return {
      errors: {
        username: ["Failed to access account. Please try again."],
      },
    };
}

  // Create session for the new user 
  await createSession(userId);
    redirect("/");
    
}