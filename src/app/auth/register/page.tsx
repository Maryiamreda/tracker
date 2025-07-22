"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { createAccount } from './actions';
import { useFormStatus } from 'react-dom';

const Register = () => {
  const [state, createAccountAction] = useActionState(createAccount, undefined);
  
  return (
  <div>
  <form className=" " action={createAccountAction}>
    <div  className="w-full">
        <p className="text-start">Full Name</p>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
       className="mt-1 border  w-full rounded p-2" 
    />
      </div>

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
  <p className="text-start">Birthday</p>
  <input 
    id="birthday" 
    name="birthday" 
    type="date"
    placeholder="YYYY-MM-DD"
    className="mt-1 border w-full rounded p-2"
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
 <p >Already have an account? <span className="cursor-pointer  text-indigo-700 underline"  ><Link href='/auth/signin'>Sign In</Link></span></p>       
    </div>
  );
}

export default Register;
