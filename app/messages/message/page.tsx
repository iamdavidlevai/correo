import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import SingleMessagePage from './single-message-page';

async function getMessage(session: any, id: string) {
  if (!session) {
    // Unauthorized
    return;
  }

  // Use the Google API access token from the session object
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=raw&access_token=${session.googleAccessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      return data.error;
    }
    return data;
  } catch (error) {
    return error.message;
  }
}

export default async function SingleMessage({ id }: { id: string }) {
  const session = await getServerSession(authOptions);
  const message = await getMessage(session, id);

  return <SingleMessagePage message={message} />;
}
