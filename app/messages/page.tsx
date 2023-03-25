import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import MessagePage from './message-page';
import SingleMessage from './message/page';
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

const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  // { name: 'Archive', href: '#', icon: ArchiveBoxIconOutline, current: false },
  // { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  // { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: NoSymbolIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilSquareIcon, current: false },
];

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

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Narrow sidebar*/}
      <nav aria-label="Sidebar" className="hidden lg:block lg:flex-shrink-0 lg:overflow-y-auto lg:bg-gray-800">
        <div className="relative flex w-20 flex-col space-y-3 p-3">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                'inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg'
              )}>
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>

      <MessagePage messages={messages} />
      <SingleMessage id={messages[0].id}></SingleMessage>
    </div>
  );
}
