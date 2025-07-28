"use server";

import { deleteSession } from "./lib/auth";

export async  function  LogOut(){
  
        const result =await deleteSession();

   
}