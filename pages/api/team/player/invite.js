import { db } from "@/utils/db-server"
import { getUser } from "@/utils/services/user-service";
import { getUserServerSession } from "@/utils/userServerSession";
import { createTeamPlayerInvite } from "@/utils/services/team-service";

// /api/team/player/invite
export default async function InvitePlayerHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let teamId = req.body.teamId
  let username = req.body.username

  // find user by username
  const user = await getUser(db, { username: username })

  // user didn't exist
  if (!user)
    return res.status(200).json({result: 'user does not exist'})

    // check if invite already exists
  const inviteExists = await db.teamInvite.findFirst({
    where: {
      AND: [
        {
          teamId: teamId
        },
        {
          userId: user.id
        }
      ]
    }
  })

  // check if player already exists on team
  const playerExists = await db.player.findFirst({
    where: {
      AND: [
        {
          teamId: teamId
        },
        {
          userId: user.id
        }
      ]
    }
  })

  // create invite if invite and player don't exist yet
  let invite = false;
  if (!inviteExists && !playerExists) {
    invite = await createTeamPlayerInvite(db, user.id, teamId)
  }

  // if invite created return success
  if (invite) {
    return res.status(200).json({result: !invite ? 'failed' : 'success'})
  }
}