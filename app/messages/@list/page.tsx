import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import MessageList from './message-page';
import {
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

async function getMessages(session: any) {
  if (!session) {
    // Unauthorized
    return;
  }

  // Use the Google API access token from the session object
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20&access_token=${session.googleAccessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      return data.error;
    }

    const messages = await Promise.all(
      data.messages.map(async (message) => {
        const details = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=metadata&access_token=${session.googleAccessToken}`
        );
        const detailsData = await details.json();

        const subject = detailsData.payload.headers.find((header) => header.name === 'Subject').value;
        const date = detailsData.payload.headers.find((header) => header.name === 'Date').value;
        const sender = detailsData.payload.headers.find((header) => header.name === 'From').value;
        const snippet = detailsData.snippet;
        return {
          id: message.id,
          subject,
          date,
          sender,
          snippet,
        };
      })
    );
    return messages;
  } catch (error) {
    return error.message;
  }
}

export default async function Messages() {
  const session = await getServerSession(authOptions);
  const messages = await getMessages(session);

  console.log(messages);

  return <MessageList messages={messages} />;
}
