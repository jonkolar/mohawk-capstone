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


// This gets called on every request
export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const teams = await db.team.findMany({
       where: {
        ownerId: session.user.id
       },
       include: {
        game: true
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