import { db } from "@/utils/db-server"

export default async function searchPostsHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let search = req.body.search;
  let cursor = req.body.cursor

  let posts = [];
  if (cursor) {
    posts = await db.post.findMany({
        take: 1,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            content: {
                contains: search
            }
        },
        orderBy: {
            date: 'desc'
        }
    })
  } else {
    posts = await db.post.findMany({
        take: 1,
        where: {
            content: {
                contains: search
            }
        },
        orderBy: {
            date: 'desc'
        }
    })
  }
  
  return res.status(200).json({results: posts})
}