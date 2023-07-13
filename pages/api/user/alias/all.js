//import { getServerSession } from "next-auth/next"


import { authOptions } from "../../auth/[...nextauth]"
import { db } from "@/utils/db-server"

// api/user/alias/all
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  const userId = req.body.userId;

  //const session = await getServerSession(req, res, authOptions);

  const aliases = await db.alias.findMany({
    where: {
        userId: userId
    }
  })

  return res.status(200).json({aliases: aliases})
}