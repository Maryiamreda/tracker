"use client";

import React, { useActionState, useState } from 'react';
import Link from 'next/link';
import { signIn } from './action';
import styles from './style.module.scss';
import i from '../../../../public/assets/pics/backgroundImage.svg';
  const SignInForm = () => {
    const [state, logInAction] = useActionState(signIn, undefined); 
  const[date,setDate]=useState(new Date().toLocaleString())
  
return (
<div className={`${styles.container}`}>
  <div className={`${styles.receiptPrinter}    bg-emerald-50 w-85 rounded-xl p-5 flex items-center justify-center`}>
    <div className='bg-black-olive w-80 rounded-xl p-1.5'></div>
  </div>
 <form   className={`${styles.inputForm} bg-white w-70 flex flex-col items-center relative bottom-6 rounded-t-sm`} action={logInAction} >
<h1 className={` ${styles}    text-3xl font-bold`}><span className='text-sea-green text-6xl'>w</span>elcome!</h1>
<div>{date}</div>
<hr className="border-t-3 border-dashed border-black w-full my-5" />
<div className={`${styles.inputDiv} w-full font-semibold my-2`}>
        <p className="">Email:</p>
        <input 
          id="email" 
          name="email" 
          placeholder="enter a your email" 
          className={styles.inputField}
        />
      </div>
<div className={`${styles.inputDiv} w-full font-semibold my-2 `}>
        <p className="">password:</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          className={styles.inputField}
          // style={{ width: 'inherit' }}  
                />
      </div>
<hr className="border-t-3 border-dashed border-black w-full my-5" />
   <button type='submit' className={` ${styles.formButton}     border rounded w-full font-bold text-lg cursor-pointer my-4 `}  > Log In  </button>  
    <div>
        <p className=''>Don't have an account?</p>
        <p className="cursor-pointer text-center  text-indigo-800 underline" ><Link  href='/auth/register' >Sign Up</Link></p> 
      </div>
      <div className='flex gap-2 relative top-6'>
         {Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className={styles.circle}></div>
  ))}
      </div>
     

</form>
  </div>

      
  );
}

export default SignInForm;
