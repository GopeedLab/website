import Head from 'next/head'
import Header from '../components/Header'
import { useTranslation } from 'next-i18next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

const Home = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>Gopeed</title>
        <meta name="description" content="Gopeed offical website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="content-container hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="/images/ui.png"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="UI"
            width={800}
            height={628}
          />
          <div>
            <h1 className="text-5xl font-bold">Gopeed</h1>
            <p className="py-6">{t('home.desc')}</p>
            <a
              className="btn btn-primary"
              target="_blank"
              href="https://github.com/GopeedLab/gopeed/releases/latest"
              rel="noreferrer"
            >
              {t('download')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Home
