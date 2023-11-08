import { db } from "@/utils/db-server"

// /api/search/users
export default async function searchUsersHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let search = req.body.search;
  let cursor = req.body.cursor;

  // retrieve paginated user results
  let users = [];
  if (cursor) {
    users = await db.user.findMany({
        take: 3,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            username: {
                contains: search,
                mode: 'insensitive'
            }
        },
        orderBy: {
            username: 'asc'
        }
    })
  } else {
    users = await db.user.findMany({
        take: 3,
        where: {
            username: {
                contains: search,
                mode: 'insensitive'
            }
        },
        orderBy: {
            username: 'asc'
        }
    })
  }
  
  // return user results
  return res.status(200).json({results: users})
}