import { db } from "@/utils/db-server"

import { getUserServerSession } from "@/utils/services/user-service"
import { createTeamMatch, deleteTeamMatchChallenge } from "@/utils/services/team-service";

export default async function AcceptMatchHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let matchChallengeId = req.body.matchChallengeId
  let team1Id = req.body.team1Id
  let team2Id = req.body.team2Id
  let date = new Date(req.body.date)

  // create match
  const newMatch = await createTeamMatch(db, team1Id, team2Id, date);

  // delete match challenge
  const deletedChallenge = await deleteTeamMatchChallenge(db, matchChallengeId)

  // return success if new match created
  if (newMatch) {
    return res.status(200).json({ match: newMatch })
  }
}