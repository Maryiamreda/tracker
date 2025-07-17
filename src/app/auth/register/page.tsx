import React from 'react';
import Link from 'next/link';

const Register = () => {
  return (
    <div>
  <form className="min-h-[80vh] flex items-center ">
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
        <p className="text-start">password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="mt-1 border  w-full rounded p-2" 
        />
      </div>
      </form>     
 <p >Already have an account? <span className="cursor-pointer  text-indigo-700 underline"  ><Link href='/auth/signin'>Sign In</Link></span></p>       
    </div>
  );
}

export default Register;
