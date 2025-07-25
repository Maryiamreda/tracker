import { getUserFromSession } from '@/lib/session';
import React from 'react';
import { redirect } from 'next/navigation';

type Props = {
  params: { userId: string };
};

const Page = async ({ params }: Props) => {
  const user = await getUserFromSession();

  if (!user?.userId) {
    // ✅ Server components should use redirect instead of returning JSX for navigation
    redirect('/auth/signin');
  }

  const userIdFromSession = parseInt(user.userId.toString(), 10);
  const userIdFromParams = parseInt(params.userId, 10);

  if (userIdFromSession !== userIdFromParams) {
    // ✅ Redirect unauthorized users to a safer location
    redirect('/');
  }

  return (
    <div>
      <h1>Welcome, {user.userName || 'User'}!</h1>
      <p>User ID: {user.userId}</p>
    </div>
  );
};

export default Page;