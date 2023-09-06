import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession"

export default async function DataUserCountHandler(req, res) {
  // only accept GET requests
  if (req.method !== 'GET') return res.status(404).json({Error: "Invalid Request"})

  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve total user count
  const userCount = await db.user.count()

  // return success with user count
  return res.status(200).json({userCount: userCount})
}