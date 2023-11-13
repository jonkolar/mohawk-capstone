import { useState } from "react";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

import CreateTeamModal from "@/components/CreateTeamModal";
import TeamList from "@/components/TeamList";
import { db } from "@/utils/db-server";
import { deleteTeamCall } from "@/utils/api/team-api";

import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';

// account/teams

// FRONTEND
export default function AccountTeams({ user, teams, games }) {
    // states
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)

    // delete team button handler
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', gap: 1, color: 'white', ml: 2}}>
                        <GroupsIcon />
                        <Typography>YOUR TEAMS</Typography>
                    </Box>
                    <TeamList teams={teams} user={user} onDeleteTeamHandler={onDeleteTeamHandler} />
                </Box>
                <Button variant="contained" 
                        color='primary'
                        sx={{marginTop: 2}}
                        onClick={() => setShowCreateTeamModal(!showCreateTeamModal)}>
                        Create New Team
                </Button>
            </Box>

            <CreateTeamModal open={showCreateTeamModal} setModal={setShowCreateTeamModal} user={user} games={games} />
        </>
    )
}


// BACKEND
export async function getServerSideProps(context) {
    // get current user session
    const session = await getServerSession(context.req, context.res, authOptions)

    // retrieve user teams
    const teams = await db.team.findMany({
        where: {
            OR: [
                {
                    ownerId: session.user.id,
                },
                {
                    players: {
                        some: {
                            userId: session.user.id
                        }
                    }
                },
            ]
        },
        include: {
            game: true
        },
        orderBy: {
            id: 'asc'
        }
    })

    // retrieve all games
    const games = await db.game.findMany()

    // send data to frontend
    return { props: { user: session.user, teams: teams, games: games } };
}