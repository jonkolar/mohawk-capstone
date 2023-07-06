import { useState } from "react";
import { getServerSession } from "next-auth/next"

import { authOptions } from "../api/auth/[...nextauth]";
import { db } from "@/utils/db-server";

import CreateTeamModal from "@/components/CreateTeamModal";
import TeamList from "@/components/TeamList";

import Button from '@mui/material/Button';

import { deleteTeamCall } from "@/utils/api/team-api";

export default function AccountTeams({ user, teams, games }) {
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)

    const onDeleteTeamHandler = async (teamId) => {
        await deleteTeamCall(teamId)
            .then(response => {
                if (response) {
                    console.log(response)
                    location.reload()
                } else {
                    console.log('something went wrong')
                }
            })
    }

    return (
        <>
            <div className="flex">
                <h1>MY TEAMS</h1>
                <TeamList teams={teams} user={user} onDeleteTeamHandler={onDeleteTeamHandler} />
            </div>
            <div>
                <Button onClick={() => setShowCreateTeamModal(!showCreateTeamModal)}>Create Team</Button>
            </div>

            <CreateTeamModal open={showCreateTeamModal} setModal={setShowCreateTeamModal} user={user} games={games} />
        </>
    )
}


// This gets called on every request
export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const teams = await db.team.findMany({
       where: {
        ownerId: session.user.id
       }
    })

    const players = await db.player.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            team: true
        }
    })

    players.forEach(player => {
        if (teams.findIndex(team => {
            return team.id == player.team.id
        }) == -1) {
            teams.push(player.team)
        }
    })

    const games = await db.game.findMany()

    // Pass data to the page via props
    return { props: { user: session.user, teams: teams, games: games } };
}