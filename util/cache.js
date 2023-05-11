export default async function getLatestRelease() {
  return await (await fetch('https://api.github.com/repos/GopeedLab/gopeed/releases/latest', { next: { revalidate: 300 } })).json()
}
