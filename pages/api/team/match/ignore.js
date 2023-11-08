import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { deleteTeamMatchChallenge } from "@/utils/services/team-service";

// /api/team/match/ignore
export default async function IgnoreMatchChallengeHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let matchChallengeId = req.body.matchChallengeId

  // delete challenge
  const deletedChallenge = await deleteTeamMatchChallenge(db, matchChallengeId);

  // if match challenge deleted return success
  if (deletedChallenge) {
    return res.status(200).json({success: true})
  }
}