import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { createTeamPlayer, deleteTeamPlayerInvite } from "@/utils/services/team-service";

// /api/user/invite-answer
export default async function SendUserTeamInviteHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let inviteId = req.body.inviteId
  let answer = req.body.answer
  let aliasId = req.body.aliasId

  // find invite for details
  const invite = await db.teamInvite.findUnique({
    where: {
        id: inviteId
    }
  })

  // create player if invite was accepted
  if (answer) {
    const createdPlayer = await createTeamPlayer(db, invite.teamId, invite.userId, aliasId)
  }

  // delete the team invite since it was answered
  const deletedTeamInvite = await deleteTeamPlayerInvite(db, invite.id)

  // return success if delete team invite
  if (deletedTeamInvite) {
    return res.status(200).json({ success: true })
  }
}