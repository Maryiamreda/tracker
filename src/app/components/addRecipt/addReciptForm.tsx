"use client";

import React, { useActionState, useEffect, useState } from 'react';
import { addReceipt } from './actions';
import {  Tag } from '@/app/types/types';
import { useRouter } from 'next/navigation';

type Props = {
  tags: Tag[];
};
const AddReceiptForm = ({ tags }: Props) => {
  const [state, createreciptaction] = useActionState(addReceipt, undefined); 
 const [items, setItems] = useState([
    { id: '1', details: '', cost: 0 , tags:[] }
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      details: '',
      cost: 0 , 
      tags: []
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
const router = useRouter();
useEffect(() => {
  if (state?.success) {
    router.refresh(); // i still get the erorr Property 'refresh' does not exist on type 'SingletonRouter'.ts(2339)

  }
}, [state, router]);

  return (
     <form className="flex flex-col items-center " action={createreciptaction}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl
       text-sm shadow-lg">
         
     <div  className="w-full">
         <p className="text-start">headline</p>
        <input 
          id="headline" 
          name="headline" 
          placeholder="headline" 
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
 <div className='flex text-xs gap-2 flex-wrap mb-2'>
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name={`items[${index}][tags]`} 
                    value={tag.id.toString()} // tag.id as value
                    id={`item-${index}-tag-${tag.id}`} //unique ID
                
                    className="cursor-pointer"
                  />
                  <label htmlFor={`item-${index}-tag-${tag.id}`} className="cursor-pointer">
                    {tag.icon} {tag.name}
                  </label>
                </div>
              ))}
            </div>
<div className='flex'>
<div>
            <p className="text-start">details</p>
        <input 
          id="details" 
  name={`items[${index}][details]`} 
          placeholder="details" 
       className="mt-1 border   rounded p-2" 
    />
</div>

    <div>
       <p className="text-start">cost</p>
        <input 
        type='number'
          id="cost" 
  name={`items[${index}][cost]`} 
          placeholder="cost" 
       className="mt-1 border  rounded p-2" 
    />
    </div>
    
</div>

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


<button
  type="submit"
  className="bg-green-950 text-white rounded p-2  transition"
>
  Save Receipt
</button>
      
    {state?.error && (
  <div className="text-red-500 text-sm">
    {Object.entries(state.error).map(([field, value]) => (
      <p key={field}>{field}: {JSON.stringify(value)}</p>
    ))}
  </div>
)}


     
    
    </form>
  );
}

export default AddReceiptForm;
