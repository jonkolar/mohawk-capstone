import { db } from "@/utils/db-server"

export default async function SendMatchHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let senderTeamId = req.body.senderTeamId
  let receiverTeamId = req.body.receiverTeamId
  let date = new Date(req.body.date)

  const newMatchChallenge = await db.matchChallenge.create({
    data: {
        senderTeamId: senderTeamId,
        receiverTeamId: receiverTeamId,
        date: date
    }
  })

  return res.status(200).json(newMatchChallenge)
}