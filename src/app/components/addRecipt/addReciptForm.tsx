"use client";

import React, { useState } from 'react';
interface Item {
  id: string;
  details: string;
  cost: string;
}
const AddReciptForm = () => {
 const [items, setItems] = useState<Item[]>([
    { id: '1', details: '', cost: '' }
  ]);

  const addItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      details: '',
      cost: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };



  return (
     <form className="flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl
       text-sm shadow-lg">
         
     <div  className="w-full">
         <p className="text-start">headline</p>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
       className="mt-1 border  w-full rounded p-2" 
    />
      </div>
     


{items.map((item, index) => (
              <div key={index} className="w-full">
                <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                    <p className="text-start">Item</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
className="mt-1 border  w-full rounded p-2" 
        />
      </div>
     
     
  ))}



             <button
            type="button"
            onClick={addItem}
            className="w-full border-2 border-dashed border-gray-300 rounded p-3 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
          >
            + Add Another Item
          </button>
        </div>



      
    


     
    
    </form>
  );
}

export default AddReciptForm;
