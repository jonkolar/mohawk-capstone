import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { getTeamMatch, deleteTeamMatch } from "@/utils/services/team-service";

export default async function CancelMatchHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let matchId = req.body.matchId

  // ensure match can only be deleted by one of the teams owners
  const match = await getTeamMatch(db, matchId);
  if (match.team1.ownerId != sessionUser.id && match.team2.ownerId != sessionUser.id)
    return res.status(404).json({Error: "You have to be a team owner to cancel a match"})

  // delete match
  const deletedMatch = await deleteTeamMatch(db, matchId);

  // if match deleted then return success
  if (deletedMatch) {
    return res.status(200).json({result: "success"})
  }
}