import { db } from "@/utils/db-server"

export default async (req, res) => {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  const userId = req.body.userId;

  // find all user aliases
  const aliases = await db.alias.findMany({
    where: {
        userId: userId
    }
  })

  // return success if all queries successful
  return res.status(200).json({aliases: aliases})
}