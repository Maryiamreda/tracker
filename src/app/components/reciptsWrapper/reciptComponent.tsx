import { getUserReceipts } from '@/server/backend/queries/receiptsQueries';
import React from 'react';

const ReciptComponent = async () => {
 const { data: receipts }=await getUserReceipts();
  if(!receipts) return <div>Error </div>
return (
<div >
  {receipts.length>0?<div>{receipts.map((receipt , index)=>(<div key={index} >
    <h1>    {receipt.headline}</h1>
    {receipt.items.map((item , index)=>(
      <div key={index} >
      <h1>{item.details}</h1>
      <div className="flex">

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
