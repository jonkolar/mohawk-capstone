import { db } from "@/utils/db-server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function SendUserTeamInviteHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // Check if user is admin
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.admin)
    return res.status(404).json({Error: "Admin only access to this route"})

  let username = req.body.username
  let banned = req.body.banned

  if (!username || !await db.user.count({ where: { username: username } })) 
    return res.status(404).json({Error: "Invalid username"})

  const updateUser = await db.user.update({
    where: {
      username: username,
    },
    data: {
      banned: banned,
    },
  })

  return res.status(200).json({ success: true })
}