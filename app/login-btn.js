'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import UserInformation from './user-information';

export default function Component({ children }) {
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>loading...</p>;
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black "
          onClick={() => signOut()}>
          Sign out
        </button>
        {children}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
