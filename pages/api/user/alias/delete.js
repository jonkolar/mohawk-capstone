import { db } from "@/utils/db-server"
import { deleteUserAlias } from "@/utils/services/user-service";
import { getUserServerSession } from "@/utils/userServerSession";

// api/user/alias/delete
export default async (req, res) => {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  const aliasId = req.body.aliasId

  // create alias
  const deletedAlias = await deleteUserAlias(db, aliasId);

  // return success if alias created
  if (deletedAlias) {
    return res.status(200).json({success: true})
  }
}