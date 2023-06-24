import { db } from "@/utils/db-server"

export default async function CreateTeamHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let email = req.body.email
  let name = req.body.name
  let gameId = req.body.gameId
  let description = req.body.description

  const user = await db.user.findUnique({
    where: {
        email: email
    }
  })

  const newTeam = await db.team.create({
    data: {
        ownerId: user.id,
        name: name,
        gameId: gameId,
        description: description
    }
  })

  return res.status(200).json({name: newTeam.name, gameId: newTeam.gameId, description: newTeam.description})
}