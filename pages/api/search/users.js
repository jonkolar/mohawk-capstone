import { db } from "@/utils/db-server"

export default async function searchUsersHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let search = req.body.search;
  let cursor = req.body.cursor

  let users = [];
  if (cursor) {
    users = await db.user.findMany({
        take: 1,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            username: {
                contains: search
            }
        },
        orderBy: {
            username: 'asc'
        }
    })
  } else {
    users = await db.user.findMany({
        take: 1,
        where: {
            username: {
                contains: search
            }
        },
        orderBy: {
            username: 'asc'
        }
    })
  }
  
  return res.status(200).json({results: users})
}