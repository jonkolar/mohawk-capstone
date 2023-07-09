import { db } from "@/utils/db-server"

export default async function DataGamesHandler(req, res) {
  if (req.method !== 'GET') return res.status(404).json({Error: "Invalid Request"})

  const games = await db.game.findMany()

  return res.status(200).json({games: games})
}