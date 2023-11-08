import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { createTeamPost } from "@/utils/services/team-service";

// /api/team/post/create
export default async function CreatePostHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let teamId = req.body.teamId
  let content = req.body.content

  // create new post
  const newPost = await createTeamPost(db, teamId, content)

  // if post created then return success
  if (newPost) {
    return res.status(200).json({newPost})
  }
}