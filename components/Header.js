import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useRouter } from 'next/router'
import availableLocales from '../public/locales/locales'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const Header = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const currentLocale = router.locale

  const changeLocale = (locale) => () => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, {
      locale,
    })
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`
  }

  const docsLocale = currentLocale == 'zh-CN' ? '/zh/' : ''

  return (
    <>
      <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
        <div className="navbar w-full">
          <div className="navbar-start">
            <a className="btn btn-ghost">
              <Image className="inline-flex" src="/images/logo.png" alt="logo" width={32} height={32}></Image>
              <span className="normal-case text-xl pl-4">Gopeed</span>
            </a>
          </div>

          <div className="navbar-end">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a target="_blank" href={`https://docs.gopeed.com${docsLocale}`} rel="noreferrer">
                  {t('docs')}
                </a>
              </li>
              <li>
                <a target="_blank" href="https://github.com/GopeedLab/gopeed/blob/main/.donate/index.md#donate" rel="noreferrer">
                  {t('donate')}
                </a>
              </li>
            </ul>

            <div title={t('selectLanguage')} className="dropdown dropdown-end">
              <div tabIndex="0" className="btn btn-ghost gap-1 normal-case">
                <Image className="inline-block h-4 w-4 fill-current md:h-5 md:w-5" src="/images/nav/translate.svg" width={20} height={20} alt="" />
                <Image className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" src="/images/nav/dropdown.svg" width={12} height={12} alt="" />
              </div>

              <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl">
                <ul className="menu menu-compact gap-1 p-3" tabIndex="0">
                  {Object.keys(availableLocales).map((locale) => (
                    <li key={locale}>
                      <button className={`flex ${locale == currentLocale ? 'active' : ''}`} onClick={changeLocale(locale)}>
                        <span className={`fi fi-${locale.split('-').slice(-1)[0].toLocaleLowerCase()}`}></span>
                        <span className="flex flex-1 justify-between">{availableLocales[locale]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="GitHub">
              <div className="flex-none items-center">
                <a
                  aria-label="Github"
                  target="_blank"
                  href="https://github.com/GopeedLab/gopeed"
                  rel="noopener noreferrer"
                  className="btn btn-ghost drawer-button btn-square normal-case"
                >
                  <Image className="inline-block h-5 w-5 fill-current md:h-6 md:w-6" src="/images/nav/github.svg" alt="Github" width={24} height={24} />
                </a>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
