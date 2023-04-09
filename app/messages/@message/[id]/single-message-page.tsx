'use client';

import 'setimmediate'; // This is needed for mailparser to work
import { useSession, signOut } from 'next-auth/react';

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
import { useRouter } from 'next/navigation';
import { simpleParser } from 'mailparser';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const base64UrlToBase64 = (input: string): string => {
  return input.replace('-', '+').replace('_', '/');
};

function Email({ message }) {
  // Parse the message using mailparser
  const [parsed, setParsed] = useState(null);

  useEffect(() => {
    const parseMessage = async () => {
      // Decode the base64url string
      const decoded = Buffer.from(base64UrlToBase64(message.raw), 'base64').toString('ascii');

      const promise = simpleParser(decoded);
      const parsed = await promise;
      setParsed(parsed);
    };

    parseMessage();
  }, [message]);

  if (!parsed) return null;

  // Extract the subject, from, to, date and body from the parsed object
  const subject = parsed?.subject;
  const from = parsed?.from?.text;
  const to = parsed?.to?.text;
  const date = parsed?.date;
  const body = parsed?.text;

  return (
    <section
      aria-labelledby="message-heading"
      className="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last">
      {/* Top section */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        {/* Toolbar*/}
        <div className="flex h-16 flex-col justify-center">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between py-3">
              {/* Left buttons */}
              <div>
                <div className="isolate inline-flex rounded-md shadow-sm sm:space-x-3 sm:shadow-none">
                  <span className="inline-flex sm:shadow-sm">
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10">
                      <ArrowUturnLeftIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Reply
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10 sm:inline-flex">
                      <PencilIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Note
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10 sm:inline-flex">
                      <UserPlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Assign
                    </button>
                  </span>

                  <span className="hidden space-x-3 lg:flex">
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10 sm:inline-flex">
                      <ArchiveBoxIconMini className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Archive
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10 sm:inline-flex">
                      <FolderArrowDownIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Move
                    </button>
                  </span>

                  <Menu as="div" className="relative -ml-px block sm:shadow-sm lg:hidden">
                    <div>
                      <Menu.Button className="relative inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 sm:rounded-md sm:px-3">
                        <span className="sr-only sm:hidden">More</span>
                        <span className="hidden sm:inline">More</span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400 sm:-mr-1" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm sm:hidden'
                                )}>
                                Note
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm sm:hidden'
                                )}>
                                Assign
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                Archive
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                Move
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              {/* Right buttons */}
              <nav aria-label="Pagination">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10">
                    <span className="sr-only">Next</span>
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:z-10 hover:bg-gray-50 focus:z-10">
                    <span className="sr-only">Previous</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* Message header */}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="bg-white pt-5 pb-6 shadow">
          <div className="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
            <div className="sm:w-0 sm:flex-1">
              <h1 id="message-heading" className="text-lg font-medium text-gray-900">
                {subject}
              </h1>
              <p className="mt-1 truncate text-sm text-gray-500">{from}</p>
            </div>

            <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
              <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-0.5 text-sm font-medium text-cyan-800">
                status
              </span>
              <Menu as="div" className="relative ml-3 inline-block text-left">
                <div>
                  <Menu.Button className="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex w-full justify-between px-4 py-2 text-sm'
                            )}>
                            <span>Copy email address</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex justify-between px-4 py-2 text-sm'
                            )}>
                            <span>Previous conversations</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex justify-between px-4 py-2 text-sm'
                            )}>
                            <span>View original</span>
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        {/* Thread section*/}
        <ul role="list" className="space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8">
          {/* {message.items.map((item) => ( */}
          <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h3 className="text-base font-medium">
                <span className="text-gray-900">{from}</span> <span className="text-gray-600">wrote</span>
              </h3>
              <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:mt-0 sm:ml-3">
                <time dateTime={new Date(date).toISOString()}>{new Date(date).toLocaleString()}</time>
              </p>
            </div>
            <div className="mt-4 space-y-6 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: body }} />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function SingleMessagePage({ message }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  // TODO: Fix. Lasiest error handling ever.
  if (message?.error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{message?.error?.message}</p>
        <p>You probably need to sign out and sign in again.</p>
        <button
          className="bg-black text-white font-extrabold px-4 py-2 uppercase hover:bg-white hover:text-black"
          onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return <Email message={message} />;
}
