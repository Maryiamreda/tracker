import React from 'react';

const addReciptUi = () => {
  return (
     <form className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl
       text-sm shadow-lg">
         
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
     


      </div>
    
    </form>
  );
}

export default addReciptUi;
