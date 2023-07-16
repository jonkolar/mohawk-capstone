import { db } from "@/utils/db-server"

export default async function GetPostListHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let teamId = req.body.teamId
  let cursor = req.body.cursor ? req.body.cursor : null

  let results;
  if (!cursor) {
    results = await db.post.findMany({
      take: 3,
      where: {
        teamId: teamId
      },
      orderBy: {
        date: 'desc'
    }
    })
  } else {
    results = await db.post.findMany({
      take: 3,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },
      where: {
        teamId: teamId
      },
      orderBy: {
        date: 'desc'
    }
    })
  }

  const isMore = await db.post.findFirst({
    where: {
        teamId: parseInt(teamId),
        date: {
            lt: results.at(-1).date
        }
    }
})

  return res.status(200).json({ posts: results, more: isMore ? true : false})
}