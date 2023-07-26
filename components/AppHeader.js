import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GithubSvg from '../public/images/nav/github.svg'
import Container from './Container'
import Translate from './Translate'

const AppHeader = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const docsLocale = router.locale == 'zh-CN' ? '/zh/' : ''
  return (
    <header>
      <nav className="z-10 w-full absolute">
        <Container>
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative" id="header">
            <div className="relative z-20 flex w-full justify-between lg:w-max md:px-0">
              <a href="#home" aria-label="logo" className="flex space-x-2 items-center">
                <div aria-hidden="true" className="flex space-x-1">
                  <Image src="/images/logo.png" alt="logo" width="32" height="32" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Gopeed</span>
              </a>

              <div className="relative flex items-center lg:hidden max-h-10">
                <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative  p-6 -mr-6">
                  <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                  <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
              <div
                aria-hidden="true"
                className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
              ></div>
              <div
                className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                            lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                            dark:shadow-none dark:border-gray-700"
              >
                <div className="text-gray-600 dark:text-gray-300 lg:pr-2 lg:w-auto w-full lg:pt-0">
                  <ul className="tracking-wide font-medium lg:font-bold lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0 lg:border-r dark:lg:border-white/30">
                    <li>
                      <Link href={`https://docs.gopeed.com${docsLocale}`} className="block md:px-4 transition hover:text-primary">
                        <span>{t('docs')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/GopeedLab/gopeed/blob/main/.donate/index.md#donate"
                        className="block md:px-4 transition hover:text-primary"
                      >
                        <span>{t('donate')}</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute z-30 right-[2rem] top-[0.7rem] gap-4 md:right-24 lg:relative lg:left-0 lg:top-0">
                <div className="flex justify-between">
                  <Translate />
                  <a
                    href="https://github.com/GopeedLab/gopeed"
                    className="group relative flex h-9 w-9 rounded-full transition hover:bg-blue-950/5 dark:hover:bg-white/10"
                  >
                    <GithubSvg className="m-auto h-5 w-5 fill-gray-500 group-hover:fill-gray-950 dark:fill-white/70 dark:group-hover:fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default AppHeader
