import { db } from "@/utils/db-server"

export default async function InvitePlayerHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let teamId = req.body.teamId
  let username = req.body.username

  const { id: userId } = await db.user.findUnique({
    where: {
      username: username,
    },
  })

  // check if invite already exists
  const inviteExists = await db.teamInvite.findFirst({
    where: {
      AND: [
        {
          teamId: teamId
        },
        {
          userId: userId
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
          userId: userId
        }
      ]
    }
  })

  let invite = false;
  if (!inviteExists && !playerExists) {
    invite = await db.teamInvite.create({
      data: {
        userId: userId,
        teamId: teamId
      }
    })
  }

  return res.status(200).json({result: !invite ? 'invite failed' : 'success'})
}