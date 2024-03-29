import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from './Container'
import GithubSvg from '../public/images/nav/github.svg'
import HeartSvg from '../public/images/nav/heart.svg'

const AppFooter = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const docsLocale = router.locale == 'zh-CN' ? '/zh' : ''
  return (
    <footer className="py-20 md:py-40">
      <Container>
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="flex w-full justify-center space-x-12 text-gray-600 dark:text-gray-300 sm:w-7/12 md:justify-start">
              <ul className="list-inside list-disc space-y-8">
                <li>
                  <Link href="/" className="transition hover:text-primary">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href={`https://docs.gopeed.com${docsLocale}`} className="transition hover:text-primary">
                    {t('docs')}
                  </Link>
                </li>
                <li>
                  <a href="mailto:liwei8466-qq.com" className="transition hover:text-primary">
                    {t('contact')}
                  </a>
                </li>
              </ul>

              <ul role="list" className="space-y-8">
                <li>
                  <Link href="https://github.com/GopeedLab/gopeed" className="flex items-center space-x-3 transition hover:text-primary">
                    <GithubSvg className="w-5" />
                    <span>Github</span>
                  </Link>
                </li>
                <li>
                  <a href="https://discord.gg/ZUJqJrwCGB" className="flex items-center space-x-3 transition hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="w-5">
                      <path d="M25.12 6.946c-2.424-1.948-6.257-2.278-6.419-2.292a.608.608 0 0 0-.604.357c-.004.008-.218.629-.425 1.228 2.817.493 4.731 1.587 4.833 1.647A.999.999 0 0 1 22 9.75a.99.99 0 0 1-.501-.135C21.471 9.598 18.663 8 15.002 8 11.34 8 8.531 9.599 8.503 9.615a1 1 0 0 1-1.006-1.729c.102-.06 2.023-1.158 4.848-1.65-.218-.606-.438-1.217-.442-1.225a.6.6 0 0 0-.604-.357c-.162.013-3.995.343-6.451 2.318C3.564 8.158 1 15.092 1 21.087a.6.6 0 0 0 .08.301c1.771 3.11 6.599 3.924 7.699 3.959a.61.61 0 0 0 .511-.249l1.19-1.612c-2.61-.629-3.99-1.618-4.073-1.679a1 1 0 0 1 1.181-1.614C7.625 20.217 10.172 22 15 22c4.847 0 7.387-1.79 7.412-1.808a1.001 1.001 0 0 1 1.183 1.613c-.083.061-1.456 1.048-4.06 1.677l1.175 1.615c.115.158.298.25.492.25l.019-.001c1.101-.035 5.929-.849 7.699-3.959a.6.6 0 0 0 .08-.301c0-5.994-2.564-12.928-3.88-14.14zM11 19c-1.105 0-2-1.119-2-2.5s.895-2.5 2-2.5 2 1.119 2 2.5-.895 2.5-2 2.5zm8 0c-1.105 0-2-1.119-2-2.5s.895-2.5 2-2.5 2 1.119 2 2.5-.895 2.5-2 2.5z"></path>
                    </svg>
                    <span>Discord</span>
                  </a>
                </li>
                <Link
                  href={`https://docs.gopeed.com${docsLocale}/donate.html`}
                  className="flex items-center space-x-3 transition hover:text-primary"
                >
                  <HeartSvg className="w-5" />
                  <span>{t('donate')}</span>
                </Link>
              </ul>
            </div>
            <div className="m-auto mt-16 w-10/12 space-y-6 text-center sm:mt-auto sm:w-5/12 sm:text-left">
              <span className="block text-gray-500 dark:text-gray-400">Copyright &copy; {new Date().getFullYear()} - Gopeed</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
