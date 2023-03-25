import Link from 'next/link';
import LoginBtn from './login-btn';

export default function Page() {
  return (
    <div>
      <h1>Next.js app using Google API</h1>
      <div>
        <LoginBtn>
          <Link
            className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black"
            href="/messages">
            Go to messages
          </Link>
        </LoginBtn>
      </div>
    </div>
  );
}
