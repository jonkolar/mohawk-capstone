import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { getTeamPostsPagination } from "@/utils/services/team-service";

export default async function GetPostListHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let teamId = req.body.teamId
  let cursor = req.body.cursor ? req.body.cursor : null

  // get paginated post result
  const results = await getTeamPostsPagination(db, teamId, cursor)

  // check if there are more posts by date
  const isMore = await db.post.findFirst({
    where: {
        teamId: parseInt(teamId),
        date: {
            lt: results.at(-1).date
        }
    }
  })

  // return success if queries were successful
  return res.status(200).json({ posts: results, more: isMore ? true : false})
}