"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { signIn } from './action';
import styles from './style.module.scss';
  const SignInForm = () => {
    const [state, logInAction] = useActionState(signIn, undefined); 
  
  
  return (
<div >
<form className=" bg-white w-sm"  action={logInAction} >
         <h1>Welcome!</h1>
<div className={`${styles.inputDiv} w-full`}>
        <p className="text-start">Email:</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className="" 
        />
      </div>
<div className={`${styles.inputDiv} w-full`}>
        <p className="text-start">password:</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
className="" 
        />
      </div>
   <button 
      type='submit' 
   className=" "    >
    Sign Up
    </button>  
      </form>
<p>Don't have an account?<span className="cursor-pointer text-indigo-700 underline" ><Link  href='/auth/register'>Sign Up</Link></span> </p>
    </div>
  );
}

export default SignInForm;
