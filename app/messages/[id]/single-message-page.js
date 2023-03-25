'use client';

import 'setimmediate'; // This is needed for mailparser to work
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { simpleParser } from 'mailparser';

// This component renders the email message
function Email({ message }) {
  // Parse the message using mailparser
  const [parsed, setParsed] = useState(null);

  // Use useEffect to parse the message async
  useEffect(() => {
    // Define an async function to parse the message
    const parseMessage = async () => {
      // Decode the base64url string
      const decoded = Buffer.from(message.raw, 'base64').toString('ascii');

      // Use simpleParser to parse the decoded message and get a promise
      const promise = simpleParser(decoded);

      // Await for the promise to resolve and get the parsed object
      const parsed = await promise;

      // Set the parsed object to the state
      setParsed(parsed);
    };

    // Call the async function
    parseMessage();
  }, [message]);

  // Return null if the parsed object is not ready yet
  if (!parsed) return null;

  // Extract the subject, from, to, date and body from the parsed object
  const subject = parsed.subject;
  const from = parsed.from.text;
  const to = parsed.to.text;
  const date = parsed.date;
  const body = parsed.text;
  console.log('brooooski');
  console.log(parsed);
  // Return the JSX element to render the email
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
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);
  if (status === 'loading') return <div>Loading...</div>;
  if (message === null) return <div>Loading...</div>;
  return <Email message={message} />;
}
