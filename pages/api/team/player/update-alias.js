import { getServerSession } from "next-auth/next"

import { db } from "@/utils/db-server"
import { authOptions } from "../../auth/[...nextauth]"

export default async function InvitePlayerHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  let playerId = req.body.playerId
  let aliasId = req.body.aliasId

  const updateAlias = await db.player.update({
    where: {
      id: playerId,
    },
    data: {
      aliasId: aliasId,
    },
  })

  return res.status(200).json({result: 'success'})
}