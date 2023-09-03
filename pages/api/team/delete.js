import { db } from "@/utils/db-server"

import { getUserServerSession } from "@/utils/services/user-service";
import { getTeam, deleteTeam } from "@/utils/services/team-service";

export default async function DeleteTeamHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res)
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let teamId = req.body.teamId;

  // ensure only team owner can delete team
  const team = await getTeam(db, teamId);
  if (team.ownerId !== sessionUser.id) {
    return res.status(401).json({ message: "Only the team owner can delete their team." });
  }

  // Delete Team
  const deletedTeam = await deleteTeam(db, team.id);

  // return success if deleted team successfully
  if (deletedTeam) {
    return res.status(200).json({result: 'successfully deleted team'})
  }
}