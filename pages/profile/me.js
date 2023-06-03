import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/router';
import { PrismaClient } from "@prisma/client";
import { Avatar, Badge } from "flowbite-react";

import TopNavbar from "@/components/TopNavbar"

export default function ProfileMe({ session }) {

    return (
        <> 
            <TopNavbar/>
            <div class="flex">
                <h1>MY PROFILE PAGE</h1>
            </div>
        </>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res }) {
    const session = await getServerSession(req, res, authOptions)

    const user = session.user

    // Pass data to the page via props
    return { props: { session } };
}