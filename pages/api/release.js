// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getLatestRelease from "../util/cache"

export default async function handler(req, res) {
  const data = await getLatestRelease()
  res.status(200).json(data)
}
