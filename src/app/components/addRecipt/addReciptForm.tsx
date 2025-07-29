"use client";

import React, { useActionState, useEffect, useState } from 'react';
import { addReceipt } from './actions';
import { Item, Tag } from '@/app/types';
import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';

type Props = {
  tags: Tag[];
};
const AddReceiptForm = ({ tags }: Props) => {
  const [state, createreciptaction] = useActionState(addReceipt, undefined); 
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
          <p className="text-start">details</p>
        <input 
          id="details" 
  name={`items[${index}][details]`} 
          placeholder="details" 
       className="mt-1 border  w-full rounded p-2" 
    />
     <p className="text-start">cost</p>
        <input 
        type='number'
          id="cost" 
  name={`items[${index}][cost]`} 
          placeholder="cost" 
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

{tags.map((tag)=>(<h1>{tag.name}{tag.icon}</h1>))}

<button
  type="submit"
  className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition"
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
