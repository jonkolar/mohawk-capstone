import { db } from "@/utils/db-server"
import { getUser } from "@/utils/services/user-service";

// /api/user/exists
export default async function UserExistsHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // retrieve payload parameters
  let username = req.body.username;

  // check if user exists
  let exists = false;
  const user = await getUser(db, { username: username });

  if (user)
    exists = true;

  // return result
  return res.status(200).json({ exists: exists })
}