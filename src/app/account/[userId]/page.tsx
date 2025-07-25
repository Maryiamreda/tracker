import { getUserFromSession } from '@/lib/session';
import React from 'react';
import { redirect } from 'next/navigation';

type Props = {
  params: { userId: string };
};
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  return <div className='text-5xl font-bold'>My id: {userId}</div>
}