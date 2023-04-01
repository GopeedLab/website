let releaseCache = null

export default async function getLatestRelease() {
  let data
  if (releaseCache) {
    data = releaseCache
  } else {
    data = await (await fetch('https://api.github.com/repos/GopeedLab/gopeed/releases/latest')).json()
    releaseCache = data
    // cache 1 day
    setTimeout(() => {
      cache = null
    }, 1000 * 60 * 60 * 24)
  }
  return data
}

