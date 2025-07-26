import { getUserFromSession } from '@/lib/session';
import React from 'react';
import { redirect } from 'next/navigation';


export default async function Page({
  params,
}: {
  params: Promise<{ userName: string }>
}) {
  const { userName } = await params
  return <div className='text-5xl font-bold'>My name: {userName}</div>
}