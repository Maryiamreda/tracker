"use server";

import ROUTES from "@/lib/routes";
import { createSession } from "@/server/auth";
import { userLogin } from "@/server/backend/queries/userQueries";
import { redirect } from "next/navigation";
import { string, z } from "zod";

const signInSchema=z.object({
email:z.string().trim().min(1, { message: "Email is required" }) 
  .email({ message: "Invalid email format" }),
 password: z
    .string().min(1, { message: "Password is required" }) 
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
})

export async  function signIn(prevState: any,formData: FormData){
const result=signInSchema.safeParse(Object.fromEntries(formData));
if(!result.success){
    return{
 errors: {
        email: result.error.flatten().fieldErrors.email,
        password: result.error.flatten().fieldErrors.password,
        username: undefined,
      },    }
}
    const{email,password}=result.data
    let userId;
    let userName;
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
userName=response.data.user.name;
}catch(err){
    console.error("Error Logging to account:", err);
    return {
      errors: {
        username: ["Failed to access account. Please try again."],
      },
    };
}

  // Create session for the new user 
  await createSession(userId , userName);
    redirect("/");
    
}