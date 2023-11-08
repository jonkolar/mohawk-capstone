import { db } from "@/utils/db-server"

// /api/user/alias/all
export default async (req, res) => {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  const userId = req.body.userId;
  const gameId = req.body.gameId;

  let aliases = [];
  // find all user aliases
  if (gameId) {
    aliases = await db.alias.findMany({
      where: {
          userId: userId,
          gameId: gameId
      },
      include: {
        game: true
      }
    })
  } else {
    aliases = await db.alias.findMany({
      where: {
          userId: userId
      },
      include: {
        game: true
      }
    })
  }

  // return success if all queries successful
  return res.status(200).json({aliases: aliases})
}