import { db } from "@/utils/db-server"

export default async function SendUserTeamInviteHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let inviteId = req.body.inviteId
  let answer = req.body.answer
  let aliasId = req.body.aliasId

  const invite = await db.teamInvite.findUnique({
    where: {
        id: inviteId
    }
  })

  if (answer) {
    const createPlayer = await db.player.create({
        data: {
            teamId: invite.teamId,
            userId: invite.userId,
            aliasId: aliasId
        }
    })
  }

  const deletedTeamInvite = await db.teamInvite.delete({
    where: {
        id: inviteId
    }
  })

  return res.status(200).json({ success: true })
}