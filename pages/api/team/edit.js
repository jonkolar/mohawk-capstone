import { db } from "@/utils/db-server"
import { editTeam } from "@/utils/services/team-service";

// /api/team/edit
export default async function TeamEditHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let teamId = req.body.teamId
  let name = req.body.name
  let description = req.body.description

  // edit team
  const team = await editTeam(db, teamId, name, description)

  // return result
  return res.status(200).json({ result: 'success' })
}