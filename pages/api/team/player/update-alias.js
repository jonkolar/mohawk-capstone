import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";
import { updatePlayerAlias } from "@/utils/services/team-service";

export default async function InvitePlayerHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let playerId = req.body.playerId
  let aliasId = req.body.aliasId

  // update alias
  const updatedAlias = await updatePlayerAlias(db, playerId, aliasId);

  // if alias updated return success
  if (updatedAlias) {
    return res.status(200).json({result: 'success'})
  }
}