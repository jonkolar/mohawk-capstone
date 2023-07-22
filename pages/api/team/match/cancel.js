import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

import { db } from "@/utils/db-server"

export default async function CancelMatchHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  let matchId = req.body.matchId

  const match = await db.match.findUnique({
    where: {
        id: matchId
    },
    include: {
        team1: true,
        team2: true
    }
  })

  if (match.team1.ownerId != session.user.id && match.team2.ownerId != session.user.id)
    return res.status(404).json({Error: "You have to be a team owner to cancel a match"})

  const newMatch = await db.match.delete({
    where: {
        id: matchId
    }
  })

  return res.status(200).json({result: "success"})
}