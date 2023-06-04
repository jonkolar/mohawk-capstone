import { db } from "@/utils/db-server"

export default async function CheckUsernameHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let username = req.body.username

  let available = true
  const user = await db.user.findMany({
    where: {
      username: username
    }
  })
  if (user.length > 0 || username.length <= 3)
    available = false

  return res.status(200).json({ available: available })
}