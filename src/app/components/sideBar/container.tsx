import React from 'react';
import AddReceiptForm from '../addRecipt/addReciptForm';
import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';
import Tags from '../tags/Tags';

async function SideBar  () {


  const { data: tagList } = await getUserTags(); 
  if(tagList==undefined) return <div>error adding tags</div>
  return <AddReceiptForm tags={tagList} />; 

};
export default SideBar;
