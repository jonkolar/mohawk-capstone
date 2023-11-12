import { db } from "@/utils/db-server"
import { getTeam } from "@/utils/services/team-service";

// /api/team/exists
export default async function TeamExistsHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let teamId = req.body.teamId
  let gameId = req.body.gameId

  // check if team exists
  let exists = false;
  const team = await getTeam(db, parseInt(teamId));

  console.log(gameId)
  console.log(teamId);

  if (team && team.gameId == gameId)
    exists = true;

  // return result
  return res.status(200).json({ exists: exists })
}