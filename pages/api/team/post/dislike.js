import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { deleteTeamPostLike } from "@/utils/services/team-service";

// /api/team/post/dislike
export default async function PostDislikeHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let postId = req.body.postId

  // delete post like
  const deletedPostLike = await deleteTeamPostLike(db, postId, sessionUser.id)

  // if post like deleted consider success
  if (deletedPostLike) {
    return res.status(200).json({success: true})
  }
}