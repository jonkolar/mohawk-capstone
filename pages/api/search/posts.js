import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";

export default async function searchPostsHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let search = req.body.search;
  let cursor = req.body.cursor;

  // retrieve paginated posts
  let posts = [];
  if (cursor) {
    posts = await db.post.findMany({
        take: 3,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            content: {
                contains: search,
                mode: 'insensitive'
            }
        },
        include: {
            likes: true,
            team: true
        },
        orderBy: {
            date: 'desc'
        }
    })
  } else {
    posts = await db.post.findMany({
        take: 3,
        where: {
            content: {
                contains: search
            }
        },
        include: {
            likes: true,
            team: true
        },
        orderBy: {
            date: 'desc'
        }
    })
  }
  
  // return post results
  return res.status(200).json({results: posts})
}