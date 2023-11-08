import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { createTeamPostLike } from "@/utils/services/team-service";

// /api/team/post/like
export default async function PostCreateLikeHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let postId = req.body.postId

  // create post like
  const newPostLike = await createTeamPostLike(db, postId, sessionUser.id)

  // if post created return success
  if (newPostLike) {
    return res.status(200).json({success: true})
  }
}