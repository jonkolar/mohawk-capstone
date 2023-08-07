import { db } from "@/utils/db-server"

export default async function searchTeamsHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let search = req.body.search;
  let cursor = req.body.cursor

  let teams = [];
  if (cursor) {
    teams = await db.team.findMany({
        take: 1,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            name: {
                contains: search
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
  } else {
    teams = await db.team.findMany({
        take: 1,
        where: {
            name: {
                contains: search
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
  }
  
  return res.status(200).json({results: teams})
}