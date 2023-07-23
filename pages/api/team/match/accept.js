import { db } from "@/utils/db-server"

export default async function AcceptMatchHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let matchChallengeId = req.body.matchChallengeId
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

  // delete challenge
  const deletedChallenge = await db.matchChallenge.delete({
    where: {
      id: matchChallengeId
    }
  })

  return res.status(200).json({match: newMatch})
}