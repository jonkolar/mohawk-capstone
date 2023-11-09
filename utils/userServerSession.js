import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// gets existing user session (to only be used in backend)
export async function getUserServerSession(req, res) {
    const session = await getServerSession(req, res, authOptions)
    return session.user;
}