import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import HeroSection from '@/components/HeroSection'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import getLatestRelease from '../util/cache'

const website = 'https://gopeed.com'
const websiteImage = `${website}/images/logo.png`

const Home = ({ release }) => {
  const { t } = useTranslation('common')
  const title = `Gopeed - ${t('home.title')}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={t('home.desc')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Gopeed, gopeed, Download Manager, http downloader, bt downloader" />
        <meta name="author" content="Gopeed Dev" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={website} />
        <meta property="og:image" content={websiteImage} />
        <meta property="og:description" content={t('home.desc')} />
        {/* <meta property="og:site_name" content="Download Manager"/> */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={t('home.desc')} />
        <meta name="twitter:image" content={websiteImage} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <link rel="canonical" href={website}></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main className="space-y-40">
        <HeroSection release={release} />
      </main>
      <AppFooter />
    </>
  )
}

export async function getStaticProps({ locale }) {
  const data = await getLatestRelease()

  const findDownloadUrl = (platform, os, arch, keyword, must) => {
    const isWeb = platform === 'web'
    const asset = data.assets.find((asset) => {
      let hit =
        asset.name.includes(platform) && (isWeb || !asset.name.includes('web')) && (!os || asset.name.includes(os)) && (!arch || asset.name.includes(arch))
      if (!hit) {
        return false
      }
      if (!keyword) {
        return true
      }
      if (must) {
        return asset.name.includes(keyword)
      } else {
        return !asset.name.includes(keyword)
      }
    })
    return asset ? asset.browser_download_url : ''
  }

  return {
    revalidate: 300,
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...{
        release: {
          version: data.tag_name,
          assert: {
            windows: {
              amd64: findDownloadUrl('windows', null, 'amd64', 'portable', false),
              amd64_portable: findDownloadUrl('windows', null, 'amd64', 'portable', true),
            },
            macos: {
              amd64: findDownloadUrl('macos', null, 'amd64'),
              arm64: findDownloadUrl('macos', null, 'arm64'),
            },
            linux: {
              amd64: findDownloadUrl('linux', null, 'amd64'),
            },
            android: {
              arm64: findDownloadUrl('android', null, 'arm64'),
              x86: findDownloadUrl('android', null, 'x86_64'),
            },
            ios: {
              arm64: findDownloadUrl('ios', null, null),
            },
            web: {
              window_amd64: findDownloadUrl('web', 'windows', 'amd64'),
              window_arm64: findDownloadUrl('web', 'windows', 'arm64'),
              window_386: findDownloadUrl('web', 'windows', '386'),
              darwin_amd64: findDownloadUrl('web', 'darwin', 'amd64'),
              darwin_arm64: findDownloadUrl('web', 'darwin', 'arm64'),
              linux_amd64: findDownloadUrl('web', 'linux', 'amd64'),
              linux_arm64: findDownloadUrl('web', 'linux', 'arm64'),
              linux_386: findDownloadUrl('web', 'linux', '386'),
            },
          },
        },
      },
    },
  }
}

export default Home
