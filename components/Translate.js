import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Flags from 'country-flag-icons/react/3x2'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import DropdownSvg from '../public/images/nav/dropdown.svg'
import TranslateSvg from '../public/images/nav/translate.svg'
import availableLocales from '../public/locales/locales'

const Translate = (props) => {
  const router = useRouter()
  const currentLocale = router.locale

  const changeLocale = (locale) => () => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, {
      locale,
    })
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`
  }
  return (
    <Menu as="div" className="group relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <TranslateSvg className="m-auto h-5 w-5 fill-gray-500 group-hover:fill-gray-950 dark:fill-white/70 dark:group-hover:fill-white" />
          <DropdownSvg className="ml-2 -mr-1 mt-1 h-3 w-3 fill-gray-500 text-violet-200 hover:text-violet-100" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5">
          {Object.keys(availableLocales).map((locale) => (
            <Menu.Item key={locale}>
              {({ active }) => {
                const Flag = Flags[locale.split('-').slice(-1)[0]]
                if (locale == currentLocale) {
                  return (
                    <span className="flex items-center justify-between px-3 py-1 text-primary">
                      <div className="flex items-center">
                        <Flag className="w-5 h-5" />
                        <span className="ml-2">{availableLocales[locale]}</span>
                      </div>
                      <svg width="24" height="24" fill="none" aria-hidden="true">
                        <path d="m7.75 12.75 2.25 2.5 6.25-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )
                } else {
                  return (
                    <a
                      href="void:javascript(0)"
                      onClick={changeLocale(locale)}
                      className={clsx(
                        'flex items-center justify-between px-3 py-1',
                        active && 'bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white'
                      )}
                    >
                      <div className="flex items-center">
                        <Flag className="w-5 h-5" />
                        <span className="ml-2">{availableLocales[locale]}</span>
                      </div>
                    </a>
                  )
                }
              }}
            </Menu.Item>
          ))}
          {/* <Menu.Item disabled>
            <span className="flex items-center justify-between px-3 py-1 text-sky-500 dark:text-sky-400">
              v3.0
              <svg width="24" height="24" fill="none" aria-hidden="true">
                <path d="m7.75 12.75 2.25 2.5 6.25-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="https://v2.tailwindcss.com"
                className={clsx('block px-3 py-1', active && 'bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white')}
              >
                v2.2.19
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="https://v1.tailwindcss.com"
                className={clsx('block px-3 py-1', active && 'bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white')}
              >
                v1.9.6
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="https://tailwindcss-v0.netlify.app/"
                className={clsx('block px-3 py-1', active && 'bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white')}
              >
                v0.7.4
              </a>
            )}
          </Menu.Item> */}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function DuplicateInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function DuplicateActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function ArchiveInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function ArchiveActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function DeleteInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function DeleteActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

export default Translate
