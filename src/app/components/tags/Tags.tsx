import { getUserFromSession } from '@/lib/session';
import { getUserTags } from '@/server/backend/queries/tagsQueries';
import React from 'react';

const Tags = async () => {
const user = await getUserFromSession();

  if (!user?.userId) {
    return <div>Please log in</div>;
  }

  const tags = await getUserTags(user.userId);
  return (
    <div>
     
    </div>
  );
}

export default Tags;
