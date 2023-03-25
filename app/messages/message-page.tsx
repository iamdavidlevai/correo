'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ArchiveBoxIcon as ArchiveBoxIconMini,
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  FolderArrowDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';
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
import Link from 'next/link';

const message = {
  subject: 'Re: New pricing for existing customers',
  sender: 'joearmstrong@example.com',
  status: 'Open',
  items: [
    {
      id: 1,
      author: 'Joe Armstrong',
      date: 'Yesterday at 7:24am',
      datetime: '2021-01-28T19:24',
      body: "<p>Thanks so much! Can't wait to try it out.</p>",
    },
    {
      id: 2,
      author: 'Monica White',
      date: 'Wednesday at 4:35pm',
      datetime: '2021-01-27T16:35',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p><strong style="font-weight: 600;">Monica White</strong><br/>Customer Service</p>
      `,
    },
    {
      id: 3,
      author: 'Joe Armstrong',
      date: 'Wednesday at 4:09pm',
      datetime: '2021-01-27T16:09',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MessagePage({ messages }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  // TODO: Fix. Lasiest error handling ever.
  if (messages?.error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{messages?.error?.message}</p>
        <p>You probably need to sign out and sign in again.</p>
        <button
          className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black"
          onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <aside className="hidden xl:order-first xl:block xl:flex-shrink-0">
      <div className="relative flex h-full w-96 flex-col border-r border-gray-200 bg-gray-100">
        <div className="flex-shrink-0">
          <div className="flex h-16 flex-col justify-center bg-white px-6">
            <div className="flex items-baseline space-x-3">
              <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
              <p className="text-sm font-medium text-gray-500">{messages?.length} messages</p>
            </div>
          </div>
          <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
            Sorted by date
          </div>
        </div>
        <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
          <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
            {messages?.map((message) => (
              <li
                key={message.id}
                className="relative bg-white py-5 px-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <a href="#" className="block focus:outline-none">
                      <>
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="truncate text-sm font-medium text-gray-900">{message.sender}</p>
                        <p className="truncate text-sm text-gray-500">{message.subject}</p>
                      </>
                    </a>
                  </div>
                  <time dateTime={message.date} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                    {message.date}
                  </time>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-600 line-clamp-2">{message.snippet}</p>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
