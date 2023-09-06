import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getUserServerSession(req, res) {
    const session = await getServerSession(req, res, authOptions)
    return session.user;
}