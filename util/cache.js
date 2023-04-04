let releaseCache = null

export default async function getLatestRelease() {
  let data
  if (releaseCache) {
    data = releaseCache
  } else {
    data = await (await fetch('https://api.github.com/repos/GopeedLab/gopeed/releases/latest')).json()
    releaseCache = data
    // cache 1 hour
    setTimeout(() => {
      cache = null
    }, 1000 * 60 * 60 * 1)
  }
  return data
}

