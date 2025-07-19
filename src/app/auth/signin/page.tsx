"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { signIn } from './action';

  const SignInForm = () => {
    // const [state, logInAction] = useActionState(signIn, undefined);
  
  
  return (
<div>
<form className="min-h-[80vh] flex items-center " >
       
       <div className="w-full">
                    <p className="text-start">Email</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className="mt-1 border  w-full rounded p-2" 
        />
      </div>
      <div className="w-full">
        <p className="text-start">password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
className="mt-1 border  w-full rounded p-2" 
        />
      </div>
   <button 
      type='submit' 
   className="bg-emerald-800 text-white w-full py-2 my-2 rounded-md text-base cursor-pointer "    >
    Sign Up
    </button>  
      </form>
<p>Don't have an account?<span className="cursor-pointer text-indigo-700 underline" ><Link  href='/auth/register'>Sign Up</Link></span> </p>
    </div>
  );
}

export default SignInForm;
