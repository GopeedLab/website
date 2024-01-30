// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getLatestRelease from "../../util/cache"

export default async function handler(req, res) {
  const data = await getLatestRelease()
  // get version name template from query, e.g. ?tpl=Gopeed-$version-ios.ipa
  const { tpl } = req.query
  // replace $version with version name
  const filename = tpl.replace('$version', data.tag_name)
  // redirect to download url
  res.redirect(`https://github.com/GopeedLab/gopeed/releases/latest/download/${filename}`)
}
