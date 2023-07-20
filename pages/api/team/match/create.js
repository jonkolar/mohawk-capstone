import { db } from "@/utils/db-server"

export default async function CreateMatchHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let team1Id = req.body.team1Id
  let team2Id = req.body.team2Id
  let date = new Date(req.body.date)

  const newMatch = await db.match.create({
    data: {
        team1Id: team1Id,
        team2Id: team2Id,
        date: date
    }
  })

  return res.status(200).json(newMatch)
}