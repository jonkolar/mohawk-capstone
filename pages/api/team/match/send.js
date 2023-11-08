import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { createTeamMatchChallenge } from "@/utils/services/team-service";

// /api/team/match/send
export default async function SendMatchHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let senderTeamId = req.body.senderTeamId
  let receiverTeamId = req.body.receiverTeamId
  let date = new Date(req.body.date)

  // create new match challenge
  const newMatchChallenge = await createTeamMatchChallenge(db, senderTeamId, receiverTeamId, date);

  // if match challenge created return success
  if (newMatchChallenge) {
    return res.status(200).json(newMatchChallenge)
  }
}