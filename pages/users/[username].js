import { useState } from "react";
import { useSession } from "next-auth/react"

import { db } from "@/utils/db-server";
import TeamList from "@/components/TeamList";
import PageNotFound from "@/components/PageNotFound";
import AddAliasModal from "@/components/AddAliasModal";
import AliasList from "@/components/AliasList";
import HoverIcon from "@/components/HoverIcon";
import BoxLabeIconTopper from "@/components/BoxLabelIconTopper";

import { Avatar, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

// /users/[username]

// FRONTEND
export default function UsersPage({ user, teams }) {
    const { data: session } = useSession()

    // states
    const [showAddAliasModal, setShowAddAliasModal] = useState(false)

    const isOwnProfile = session && user ? session.user.username == user.username : false

    return !user ? <PageNotFound label="User Doesn't Exist"/>
    : (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <Typography variant="h3" sx={{margin: 3}} color="white">{user.username}{isOwnProfile && ' (Your Profile)'}</Typography>
                <Avatar 
                    src={user.image}
                    sx={{ width: 100, height: 100 }}
                />
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1}}>
                    <AliasList aliases={user.aliases}/>
                    { isOwnProfile && <HoverIcon icon={<AddCircleIcon />} onClick={() => setShowAddAliasModal(true)}/> }
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <BoxLabeIconTopper icon={<GroupsIcon />} label="TEAMS"/>
                    <TeamList teams={teams} user={user}/>
                </Box>
            </Stack>
            <AddAliasModal open={showAddAliasModal} setModal={setShowAddAliasModal}/>
        </>
    )
}


// BACKEND
export async function getServerSideProps({ req, res, query }) {
    // get query parameters
    const username = query.username;
    
    // retrieve user information
    const user = await db.user.findUnique({
        where: {
            username: username
        },
        include: {
            aliases: {
                include: {
                    game: true
                }
            },
        }
    })

    // retrieve user teams
    const teams = await db.team.findMany({
        where: {
            OR: [
                {
                    ownerId: user.id,
                },
                {
                    players: {
                        some: {
                            userId: user.id
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

    // send data to frontend
    return { props: { user: JSON.parse(JSON.stringify(user)), teams: teams} };
}