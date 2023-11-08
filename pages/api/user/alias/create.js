import { db } from "@/utils/db-server"
import { createUserAlias } from "@/utils/services/user-service";
import { getUserServerSession } from "@/utils/userServerSession";

// /api/user/alias/create
export default async (req, res) => {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  const userId = sessionUser.id
  const alias = req.body.alias
  const gameId = req.body.gameId

  // create alias
  const newAlias = await createUserAlias(db, userId, alias, gameId);

  // return success if alias created
  if (newAlias) {
    return res.status(200).json({success: true})
  }
}