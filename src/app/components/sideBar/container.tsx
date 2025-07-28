import React from 'react';
import AddReceiptForm from '../addRecipt/addReciptForm';
import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';

const SideBar = async () => {
  const user = await getUserFromSession();

  if (!user?.userId) {
    return <div>Please log in</div>;
  }

  const tags = await getUserTags(user.userId);

  return (
    <div>
      <AddReceiptForm tags={tags.data} />
    </div>
  );
};
export default SideBar;
