import { db } from "@/utils/db-server"
import { getUserServerSession } from "@/utils/userServerSession";

// /api/user/update-user
export default async function UpdateUserHandler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  // get current session user
  const sessionUser = await getUserServerSession(req, res);
  if (!sessionUser) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // retrieve payload parameters
  let email = req.body.email
  let update = req.body.update

  // update user
  const updateUser = await db.user.update({
    where: {
      email: email
    },
    data: update
  })
  
  // return success if all queries successful
  return res.status(200).json(updateUser.username)
}