'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>loading...</p>;

  if (session) {
    return (
      <>
        <p>Signed in as {session?.user?.email}</p>
        <button
          className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black"
          onClick={() => signOut()}>
          Sign out
        </button>
        <br />
        {children}
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <button
        className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black"
        onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
