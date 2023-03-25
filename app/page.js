import Link from 'next/link';
import LoginBtn from './login-btn';

export default function Page() {
  return (
    <div>
      <h1>Next.js app using Google API</h1>
      <div>
        <LoginBtn>
          <Link href="/messages">Go to messages</Link>
        </LoginBtn>
      </div>
    </div>
  );
}
