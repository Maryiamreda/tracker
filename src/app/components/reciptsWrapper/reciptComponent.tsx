import { getUserReceipts } from '@/server/backend/queries/receiptsQueries';
import React from 'react';

const ReciptComponent = async () => {
 const { data: receipts }=await getUserReceipts();
  if(!receipts) return <div>Error </div>
return (
<div >
  {receipts.length>0?
  <div className='grid grid-cols-3  gap-5'>
    {receipts.map((receipt , index)=>(
    <div key={index} className='bg-celadon ' >
    <h1>    {receipt.headline}</h1>
    {receipt.items.map((item , index)=>(
      <div key={index} >
        <div className='flex'>
          <h1>{item.details}</h1>
          <h1>{item.cost}</h1>
        </div>
      
      <div className="flex gap-1">
{item.tags?.map((tag, index)=>(<div key={index}>{tag.name}{tag.icon}</div>))}
      </div>
    </div>))}
    </div>))}
    </div>
    :
    <div>No receipts yet</div>}

</div>
  );
}


export default ReciptComponent;
