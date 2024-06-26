import cache from 'memory-cache'

const keyRelease = 'release'

export default async function getLatestRelease() {
  const value = cache.get(keyRelease)
  if (value) {
    return value
  } else {
    const res = await fetch('https://api.github.com/repos/GopeedLab/gopeed/releases/latest')
    const data = await res.json();
    cache.put(keyRelease, data, 1000 * 60 * 30)
    return data
  }
}
