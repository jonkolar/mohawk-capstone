import { PrismaClient } from "@prisma/client";

export default async function UpdateUserHandler(req, res) {
  if (req.method !== 'POST') return res.status(404).json({Error: "Invalid Request"})

  let email = req.body.email
  let update = req.body.update

  const prisma = new PrismaClient()

  const updateUser = await prisma.user.update({
    where: {
      email: email
    },
    data: update
  })
  
  return res.status(200).json(updateUser.username)
}