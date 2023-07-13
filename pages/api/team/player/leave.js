import { getServerSession } from "next-auth/next"

import { db } from "@/utils/db-server"
import { authOptions } from "../../auth/[...nextauth]"

export default async function PlayerLeaveHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  console.log("GOT HERE")

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  let playerId = req.body.playerId

  const deletePlayer = await db.player.delete({
    where: {
        id: playerId
    }
  })

  console.log(deletePlayer)

  return res.status(200).json({result: 'success'})
}