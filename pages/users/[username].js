import { useState } from "react";
import { useSession } from "next-auth/react"
import { db } from "@/utils/db-server";

import TeamList from "@/components/TeamList";

import { makeStyles } from "@mui/styles";
import { Avatar, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

import AddAliasModal from "@/components/AddAliasModal";
import AliasList from "@/components/AliasList";
import HoverIcon from "@/components/HoverIcon";
import BoxLabeIconTopper from "@/components/BoxLabelIconTopper";

const useStyles = makeStyles({
    iconHover: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
})

export default function UsersPage({ user }) {
    const [showAddAliasModal, setShowAddAliasModal] = useState(false)

    const { data: session } = useSession()

    const isOwnProfile = session && user ? session.user.username == user.username : false

    return !user ? <h1>User does not exist</h1>
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
                    <TeamList teams={user.teams} user={user}/>
                </Box>
            </Stack>
            <AddAliasModal open={showAddAliasModal} setModal={setShowAddAliasModal}/>
        </>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res, query }) {
    const username = query.username
    
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
            teams: true
        }
    })
   
    // Pass data to the page via props
    return { props: { user: JSON.parse(JSON.stringify(user)) } };
}