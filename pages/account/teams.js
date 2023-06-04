import { useState } from "react";
import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/router';
import { PrismaClient } from "@prisma/client";

import TopNavbar from "@/components/TopNavbar"
import CreateTeamModal from "@/components/CreateTeamModal";

export default function AccountTeams({ session }) {
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)

    return (
        <> 
            <TopNavbar/>
            <div className="flex">
                <h1>MY TEAMS</h1>
            </div>
            <div>
                <Button>Create Team</Button>
            </div>

            <CreateTeamModal />
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