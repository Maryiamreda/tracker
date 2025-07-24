"use client";

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { createAccount } from './actions';
import styles from './style.module.scss';

const Register = () => {
  const [state, createAccountAction] = useActionState(createAccount, undefined);
   const [date, setDate] = useState<string | null>(null);
  
  useEffect(() => {
      setDate(new Date().toLocaleString());
  }, []);  
  return (
  <div className={`${styles.container}`}>
     <div className={`${styles.receiptPrinter}    bg-emerald-50 w-85 rounded-xl p-5 flex items-center justify-center`}>
    <div className='bg-black-olive w-80 rounded-xl p-1.5'></div>
  </div>
  <form className={`${styles.inputForm} bg-white w-70 flex flex-col items-center relative bottom-6 rounded-t-sm`} action={createAccountAction}>
   <h1 className={` ${styles}    text-3xl font-bold`}><span className='text-sea-green text-6xl'>w</span>elcome!</h1>
<div>{date}</div>
<hr className="border-t-3 border-dashed border-black w-full my-5" />
    <div  className={`${styles.inputDiv} w-full font-semibold my-2`}>
        <p className="text-start">Full Name</p>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
          className={styles.inputField}
    />
      </div>

       <div className={`${styles.inputDiv} w-full font-semibold my-2`}>
         <p className="text-start">Email</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className={styles.inputField}
        />
      </div>
      <div className={`${styles.inputDiv} w-full font-semibold my-2`}>
      <p className="text-start">Birthday</p>
        <input 
    id="birthday" 
    name="birthday" 
    type="date"
    placeholder="YYYY-MM-DD"
    className="mt-1 border w-full rounded p-2"
  />
     </div>
      <div className={`${styles.inputDiv} w-full font-semibold my-2`}>
        <p className="text-start">password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className={styles.inputField}
        />
      </div>
<hr className="border-t-3 border-dashed border-black w-full my-5" />

   <button type='submit' className={` ${styles.formButton}     border rounded w-full font-bold text-lg cursor-pointer my-4 `}  >Create Account </button>  
     <div>
        <p className=''>Already have an account? </p>
        <p className="cursor-pointer text-center  text-indigo-800 underline" ><Link  href='/auth/signin' >Sign In</Link></p> 
    </div>

     <div className='flex gap-2 absolute bottom-0 '>
         {Array.from({ length: 12 }).map((_, index) => (
    <div key={index} className={styles.circle}></div>
  ))}
      </div>
     
      </form>     
    </div>
  );
}

export default Register;
