import { db } from "@/utils/db-server"
import { getUser } from "@/utils/services/user-service"

export default async function CheckUsernameHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let username = req.body.username

  // username is available if user doesn't exist and it length is greater than or equal to 3
  let available = true
  const user = await getUser(db, {
      username: username
  })

console.log(user)

  if (user || username.length <= 3)
    available = false

  // return success if queries were successful
  return res.status(200).json({ available: available })
}