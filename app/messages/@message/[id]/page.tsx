import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import SingleMessagePage from './single-message-page';
import { PageProps } from '../../../../.next/types/app/page';

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
      console.log('ERROR');
      console.log(data.error);
      return data.error;
    }
    return data;
  } catch (error) {
    console.log('ERROR');
    console.log(error);
    return error.message;
  }
}

export default async function SingleMessage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  console.log('params');
  console.log(params);
  const message = await getMessage(session, params?.id);

  return <SingleMessagePage message={message} />;
}
