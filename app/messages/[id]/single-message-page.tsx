'use client';

import 'setimmediate'; // This is needed for mailparser to work
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { simpleParser } from 'mailparser';

function Email({ message }) {
  // Parse the message using mailparser
  const [parsed, setParsed] = useState(null);

  useEffect(() => {
    const parseMessage = async () => {
      // Decode the base64url string
      const decoded = Buffer.from(message.raw, 'base64').toString('ascii');

      const promise = simpleParser(decoded);
      const parsed = await promise;
      setParsed(parsed);
    };

    parseMessage();
  }, [message]);

  if (!parsed) return null;

  // Extract the subject, from, to, date and body from the parsed object
  const subject = parsed?.subject;
  const from = parsed?.from?.text;
  const to = parsed?.to?.text;
  const date = parsed?.date;
  const body = parsed?.text;

  return (
    <div className="email">
      <h1>{subject}</h1>
      <p>From: {from}</p>
      <p>To: {to}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <div className="body">{body}</div>
    </div>
  );
}

export default function SingleMessagePage({ message }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return <Email message={message} />;
}
