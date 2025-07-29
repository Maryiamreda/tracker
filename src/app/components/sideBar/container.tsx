import React from 'react';
import AddReceiptForm from '../addRecipt/addReciptForm';
import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';
import Tags from '../tags/Tags';

const SideBar = async () => {

const user = await getUserFromSession();

  if (!user?.userId) {
    return <div>Please log in</div>;
  }
  const { data: tagList } = await getUserTags(user.userId); 
  return <AddReceiptForm tags={tagList} />; 

};
export default SideBar;
