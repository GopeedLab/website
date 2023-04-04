let releaseCache = null

export default async function getLatestRelease() {
  let data
  if (releaseCache) {
    data = releaseCache
  } else {
    console.log("fetching latest release")
    data = await (await fetch('https://api.github.com/repos/GopeedLab/gopeed/releases/latest')).json()
    releaseCache = data
    // cache 1 hour
    setTimeout(() => {
      releaseCache = null
    }, 1000 * 60 * 60)
  }
  return data
}

