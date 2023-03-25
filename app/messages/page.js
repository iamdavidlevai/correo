import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import MessagePage from './message-page';

async function getMessages(session) {
  console.log(session.googleAccessToken);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // Use the Google API access token from the session object
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&access_token=${session.googleAccessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('data');
    console.log(data);
    const messages = await Promise.all(
      data.messages.map(async (message) => {
        const details = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=metadata&access_token=${session.googleAccessToken}`
        );
        const detailsData = await details.json();
        const subject = detailsData.payload.headers.find((header) => header.name === 'Subject').value;
        const date = detailsData.payload.headers.find((header) => header.name === 'Date').value;
        const sender = detailsData.payload.headers.find((header) => header.name === 'From').value;
        return {
          id: message.id,
          subject,
          date,
          sender,
        };
      })
    );
    return messages;
  } catch (error) {
    return error.message;
  }
}

export default async function Messages({}) {
  const session = await getServerSession(authOptions);
  const messages = await getMessages(session);

  return <MessagePage messages={messages} />;
}
