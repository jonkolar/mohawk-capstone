import { db } from "@/utils/db-server"

export default async function IgnoreMatchChallengeHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let matchChallengeId = req.body.matchChallengeId

  // delete challenge
  const deletedChallenge = await db.matchChallenge.delete({
    where: {
      id: matchChallengeId
    }
  })

  return res.status(200).json({success: true})
}