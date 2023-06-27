import { db } from "@/utils/db-server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function DeleteTeamHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  let teamId = req.body.teamId

  const team = await db.team.findUnique({
    where: {
      id: teamId,
    },
  })

  if (team.ownerId !== session.user.id) {
    return res.status(401).json({ message: "Only the team owner can delete their team." });
  }

  // Delete Team
  const deleteTeam = await db.team.delete({
    where: {
      id: teamId,
    },
  })

  return res.status(200).json({result: 'successfully deleted team'})
}