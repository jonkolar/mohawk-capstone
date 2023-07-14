import { db } from "@/utils/db-server"

export default async function CreatePostHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let teamId = req.body.teamId
  let content = req.body.content

  const newPost = await db.post.create({
    data: {
        teamId: teamId,
        content: content
    }
  })

  return res.status(200).json({newPost})
}