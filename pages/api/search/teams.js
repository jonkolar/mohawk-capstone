import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";

export default async function searchTeamsHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let search = req.body.search;
  let cursor = req.body.cursor;

  // retrieve paginated teams
  let teams = [];
  if (cursor) {
    teams = await db.team.findMany({
        take: 3,
        skip: 1,
        cursor: {
            id: cursor
        },
        where: {
            name: {
                contains: search,
                mode: 'insensitive',
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
  } else {
    teams = await db.team.findMany({
        take: 3,
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
  
  // return team results
  return res.status(200).json({results: teams})
}