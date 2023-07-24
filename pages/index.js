import Head from 'next/head'
import Header from '../components/Header'
import { useTranslation } from 'next-i18next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import uiImage from '../public/images/ui.png'
import iconWindows from '../public/images/platform/windows.svg'
import iconMacos from '../public/images/platform/macos.svg'
import iconLinux from '../public/images/platform/linux.svg'
import iconAndroid from '../public/images/platform/android.svg'
import iconWeb from '../public/images/platform/web.svg'
import iconDocker from '../public/images/platform/docker.svg'
import { useEffect, useState } from 'react'
import UAParser from 'ua-parser-js'
import getLatestRelease from '../util/cache'

const website = 'https://gopeed.com'
const websiteImage = `${website}/images/logo.png`

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getAssertName(url, os) {
  const path = url.split('/').pop()
  // regex remove gopeed and vx.y.z
  return path
    .replace('-' + os, '')
    .replace(/gopeed-?/i, '')
    .replace(/-?v\d+\.\d+\.\d+/, '')
    .replace(/^-/, '')
}

const platformIcons = {
  windows: iconWindows,
  macos: iconMacos,
  linux: iconLinux,
  android: iconAndroid,
  web: iconWeb,
  docker: iconDocker,
}

const Home = ({ release }) => {
  const { t } = useTranslation('common')
  const title = `Gopeed - ${t('home.title')}`

  const [ua, setUa] = useState({
    os: '',
    arch: '',
  })
  const [download, setDownload] = useState({
    url: '',
    isMatch: false,
  })
  const [showDocker, setShowDocker] = useState(false)

  function toggleDocker() {
    setShowDocker(!showDocker)
  }

  function blurDocker(e) {
    if (e.relatedTarget?.closest('.mockup-code')) {
      return
    }
    setShowDocker(false)
  }

  useEffect(() => {
    const parser = new UAParser()
    const os = parser.getOS().name
    const newUa = {
      arch: parser.getCPU().architecture,
    }
    if (os.includes('Windows')) {
      newUa.os = 'windows'
    }
    if (os.includes('Mac')) {
      newUa.os = 'macos'
    }
    if (os.includes('Linux')) {
      newUa.os = 'linux'
    }
    if (os.includes('Android')) {
      newUa.os = 'android'
    }
    setUa(newUa)
  }, [])
  useEffect(() => {
    const osAssert = release.assert[ua.os]
    // first match os and arch
    if (osAssert?.[ua.arch]) {
      setDownload({
        url: osAssert[ua.arch],
        isMatch: true,
      })
      return
    }
    // second match os
    if (osAssert) {
      setDownload({
        url: osAssert[Object.keys(osAssert)[0]],
        isMatch: true,
      })
      return
    }
    // no match, fallback to github latest release
    setDownload({
      url: 'https://github.com/GopeedLab/gopeed/releases/latest',
      isMatch: false,
    })
  }, [release.assert, ua])

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
      <Header />
      <div className="content-container bg-base-200 flex flex-wrap justify-center">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="w-full sm:w-1/2 p-4 lg:pb-32">
            <h2 className="text-xl lg:text-4xl font-bold">{t('home.title')}</h2>
            <p className="py-6">{t('home.desc')}</p>
            <a href={download.url} target={download.isMatch ? null : '_blank'} rel="noreferrer">
              <button className="btn">{t('download')}</button>
            </a>
            <h3 className="text-base inline-block pl-4">
              {release.version}
              <span className="badge badge-xs badge-outline badge-secondary ml-1 relative -top-2">New</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-6">
              {Object.keys(release.assert).map((os) => (
                <div className="flex flex-col" key={os}>
                  <div className="dropdown">
                    <label tabIndex="0" className="btn btn-outline w-28 sm:w-36">
                      <Image src={platformIcons[os]} alt={os} />
                      <span className="pl-1">{firstLetterUpperCase(os)}</span>
                      <Image
                        className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                        src="/images/nav/dropdown.svg"
                        width={12}
                        height={12}
                        alt=""
                      />
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max">
                      {Object.keys(release.assert[os])
                        .filter((arch) => !!release.assert[os][arch])
                        .map((arch) => (
                          <li key={arch}>
                            <a href={release.assert[os][arch]}>{getAssertName(release.assert[os][arch], os)}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="flex flex-col">
                <div className="dropdown" onClick={toggleDocker} onBlur={blurDocker}>
                  <label tabIndex="0" className="btn btn-outline w-28 sm:w-36">
                    <Image src={platformIcons.docker} alt="docker" />
                    <span className="pl-1">Docker</span>
                    <Image
                      className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                      src="/images/nav/dropdown.svg"
                      width={12}
                      height={12}
                      alt=""
                    />
                  </label>
                </div>
              </div>
            </div>
            <div tabIndex="0" className={`mockup-code mt-4 pb-12 ${showDocker ? '' : 'hidden lg:invisible lg:block'}`} onBlur={() => setShowDocker(false)}>
              <pre data-prefix="$" className="absolute w-min">
                <code>docker run -d -p 9999:9999 -v /path/to/download:/root/Downloads liwei2633/gopeed</code>
              </pre>
            </div>
          </div>
          <div className="w-full sm:w-1/2 p-4">
            <Image src={uiImage} className="rounded-md lg:rounded-xl shadow-lg" alt="UI" />
          </div>
        </div>
        <footer className="footer footer-center bg-base-200 text-base-content">
          <div>
            <p>Copyright © {new Date().getFullYear()} - Gopeed</p>
          </div>
        </footer>
      </div>
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
              amd64: findDownloadUrl('macos', null, null),
            },
            linux: {
              amd64: findDownloadUrl('linux', null, 'amd64'),
            },
            android: {
              arm64: findDownloadUrl('android', null, null),
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
