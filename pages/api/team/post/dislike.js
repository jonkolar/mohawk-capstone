import { db } from "@/utils/db-server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";

export default async function PostDislikeHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions)

  let postId = req.body.postId

  const deletedPostLike = await db.postLike.deleteMany({
    where: {
        postId: postId,
        userId: session.user.id
    }
  })

  return res.status(200).json({success: true})
}