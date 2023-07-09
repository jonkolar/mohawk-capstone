import { getServerSession } from "next-auth/next"


import { authOptions } from "../../auth/[...nextauth]"
import { db } from "@/utils/db-server"

// api/user/alias/create
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions);

  const userId = session.user.id
  const alias = req.body.alias
  const gameId = req.body.gameId

  const newAlias = await db.alias.create({
    data: {
        userId: userId,
        alias: alias,
        gameId: gameId
    }
  })

  return res.status(200).json({success: true})
}