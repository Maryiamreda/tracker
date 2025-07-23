"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { signIn } from './action';
import styles from './style.module.scss';
  const SignInForm = () => {
    const [state, logInAction] = useActionState(signIn, undefined); 
  
  
return (
<div className={`${styles.container}`}>
  <div className='bg-emerald-50 w-85 rounded-xl p-5 flex items-center justify-center'>
    <div className='bg-black-olive w-80 rounded-xl p-1.5'></div>
  </div>
 <form   className={`${styles.inputForm} bg-white w-70 flex flex-col gap-6 items-center relative bottom-6 rounded-t-sm`} action={logInAction} >
<h1 className={` ${styles}    text-3xl font-bold`}><span className='text-sea-green text-6xl'>w</span>elcome!</h1>
<hr className="border-t-3 border-dashed border-black w-full my-2" />
<div className={`${styles.inputDiv} w-full font-semibold`}>
        <p className="">Email:</p>
        <input 
          id="email" 
          name="email" 
          placeholder="enter a your email" 
          className={styles.inputField}
        />
      </div>
<div className={`${styles.inputDiv} w-full font-semibold `}>
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
<hr className="border-t-3 border-dashed border-black w-full my-2" />
   <button type='submit' className=" border rounded w-full font-bold text-lg cursor-pointer "  > Log In  </button>  
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
