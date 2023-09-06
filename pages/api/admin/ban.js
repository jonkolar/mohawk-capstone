import { db } from "@/utils/db-server"

import { getUserServerSession } from "@/utils/userServerSession";

export default async function SendUserTeamInviteHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // Check if user is admin
  if (!sessionUser.admin)
    return res.status(404).json({Error: "Admin only access to this route"})

  // retrieve payload parameters
  let username = req.body.username
  let banned = req.body.banned

  // check if user with username exists
  if (!username || !await db.user.count({ where: { username: username } })) 
    return res.status(404).json({Error: "Invalid username"})

  // update user to banned or unban
  const updateUser = await db.user.update({
    where: {
      username: username,
    },
    data: {
      banned: banned,
    },
  })

  // return success if user updated
  if (updateUser) {
    return res.status(200).json({ success: true })
  }
}