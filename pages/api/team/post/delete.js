import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { deleteTeamPost } from "@/utils/services/team-service";

export default async function DeletePostHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let postId = req.body.postId;

  // delete post
  const deletedPost = await deleteTeamPost(db, postId);

  // if post deleted then return success
  if (deletedPost) {
    return res.status(200).json({success: true})
  }
}