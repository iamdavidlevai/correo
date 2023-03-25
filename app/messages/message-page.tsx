'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MessagePage({ messages }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>
            <Link href={`/messages/${message.id}`}>
              {message.subject} - {message.date} - {message.sender}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
