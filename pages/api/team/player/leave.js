import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { deleteTeamPlayer } from "@/utils/services/team-service";

// /api/team/player/leave
export default async function PlayerLeaveHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let playerId = req.body.playerId

  // delete player
  const deletedPlayer = await deleteTeamPlayer(db, playerId);

  // if player deleted return success
  if (deletedPlayer) {
    return res.status(200).json({result: 'success'})
  }
}