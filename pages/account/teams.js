import { useState } from "react";
import { getServerSession } from "next-auth/next"

import { authOptions } from "../api/auth/[...nextauth]";
import { db } from "@/utils/db-server";

import TopNavbar from "@/components/TopNavbar"
import CreateTeamModal from "@/components/CreateTeamModal";
import TeamList from "@/components/TeamList";

import Button from '@mui/material/Button';

import { deleteTeamCall } from "@/utils/team-api";

export default function AccountTeams({ user, games }) {
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)

    const onDeleteTeamHandler = async (teamId) => {
        await deleteTeamCall(teamId)
            .then(response => {
                if (response) {
                    location.reload()
                } else {
                    console.log('something went wrong')
                }
            })
    }

    return (
        <> 
            <TopNavbar/>
            <div className="flex">
                <h1>MY TEAMS</h1>
                <TeamList teams={user.teams} onDeleteTeamHandler={onDeleteTeamHandler}/>
            </div>
            <div>
                <Button onClick={() => setShowCreateTeamModal(!showCreateTeamModal)}>Create Team</Button>
            </div>

            <CreateTeamModal open={showCreateTeamModal} setModal={setShowCreateTeamModal} user={user} games={games}/>
        </>
    )
}


// This gets called on every request
export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, authOptions)

    const user = await db.user.findUnique({
        where: {
            username: session.user.username
        },
        include: {
            teams: {
                include: {
                    game: true
                }
            }
        }
    })

    const games = await db.game.findMany()
   
    // Pass data to the page via props
    return { props: { user: user, games: games } };
}