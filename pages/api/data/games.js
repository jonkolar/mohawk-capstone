import { db } from "@/utils/db-server"

// /api/data/games
export default async function DataGamesHandler(req, res) {
  // only accept GET requests
  if (req.method !== 'GET') return res.status(404).json({Error: "Invalid Request"})

  // retrieve all available games
  const games = await db.game.findMany()

  // return success if games found
  if (games) {
    return res.status(200).json({games: games})
  }
}