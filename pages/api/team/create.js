import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession"
import { createTeam } from "@/utils/services/team-service"

// /api/team/create
export default async function CreateTeamHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let name = req.body.name
  let gameId = req.body.gameId
  let description = req.body.description

  // create team
  const newTeam = await createTeam(db, sessionUser.id, name, gameId, description)

  // return success if new team created
  if (newTeam) {
    return res.status(200).json(newTeam)
  }
}