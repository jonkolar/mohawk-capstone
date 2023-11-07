import { db } from "@/utils/db-server"
import { getUser } from "@/utils/services/user-service"

export default async function CheckUsernameHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let username = req.body.username

  // username is invalid if less than 3 characters or more than 20
  if (username.length < 3 || username.length > 20)
    return res.status(200).json({ available: false })

  // username is available if user doesn't exist
  let available = true
  const user = await getUser(db, {
      username: username
  })

  if (user)
    available = false

  // return success if queries were successful
  return res.status(200).json({ available: available })
}