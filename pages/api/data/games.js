import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession"

export default async function DataGamesHandler(req, res) {
  // only accept GET requests
  if (req.method !== 'GET') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve all available games
  const games = await db.game.findMany()

  // return success if games found
  if (games) {
    return res.status(200).json({games: games})
  }
}