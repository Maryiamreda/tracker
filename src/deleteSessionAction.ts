"use server";

import { deleteSession } from "./server/auth";

export async  function  LogOut(){
  
        const result =await deleteSession();

   
}