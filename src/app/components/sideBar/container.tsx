import React from 'react';
import AddReceiptForm from '../addRecipt/addReciptForm';
import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';
import Tags from '../tags/Tags';

const SideBar = async () => {


  const { data: tagList } = await getUserTags(); 
  return <AddReceiptForm tags={tagList} />; 

};
export default SideBar;
