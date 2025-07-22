"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { signIn } from './action';
import styles from './style.module.scss';
  const SignInForm = () => {
    const [state, logInAction] = useActionState(signIn, undefined); 
  
  
  return (
<form className=" bg-white w-70 flex flex-col gap-6 items-center"  action={logInAction} >
<h1 className='text-3xl font-bold '>Welcome!</h1>
<hr className={styles.dottedLine} />
<div className={`${styles.inputDiv} w-full`}>
        <p className="">Email:</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className={styles.inputField}
        />
      </div>
<div className={`${styles.inputDiv} w-full`}>
        <p className="">password:</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className={styles.inputField}
        />
      </div>
   <button 
      type='submit' 
   className=" "    >
Log In    </button>  
    <div>
        <p className=''>Don't have an account?</p>
        <p className="cursor-pointer text-center   text-indigo-800 underline" ><Link  href='/auth/register' >Sign Up</Link></p> 

      </div>
      </form>
      
  );
}

export default SignInForm;
