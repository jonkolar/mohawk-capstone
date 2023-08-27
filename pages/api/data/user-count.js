import { db } from "@/utils/db-server"

export default async function DataUserCountHandler(req, res) {
  if (req.method !== 'GET') return res.status(404).json({Error: "Invalid Request"})

  const userCount = await db.user.count()

  return res.status(200).json({userCount: userCount})
}