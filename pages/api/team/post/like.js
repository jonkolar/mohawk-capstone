import { db } from "@/utils/db-server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";

export default async function PostCreateLikeHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const session = await getServerSession(req, res, authOptions)

  let postId = req.body.postId

  const newPostLike = await db.postLike.create({
    data: {
        userId: session.user.id,
        postId: postId
    }
  })

  return res.status(200).json({success: true})
}