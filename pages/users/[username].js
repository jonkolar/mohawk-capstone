import { useState } from "react";
import { useSession } from "next-auth/react"
import { db } from "@/utils/db-server";

import { makeStyles } from "@mui/styles";
import { Avatar, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddAliasModal from "@/components/AddAliasModal";
import AliasList from "@/components/AliasList";
import HoverIcon from "@/components/HoverIcon";

const useStyles = makeStyles({
    iconHover: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
})

export default function UsersPage({ user }) {
    if (!user) {
        return <h1>User does not exist</h1>
    }

    const [showAddAliasModal, setShowAddAliasModal] = useState(false)

    const classes = useStyles();

    const { data: session } = useSession()

    const isOwnProfile = session ? session.user.username == user.username : false

    return (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <h1>{user.username}{isOwnProfile && ' (Your Profile)'}</h1>
                <Avatar 
                    src={user.image}
                    sx={{ width: 100, height: 100 }}
                />
                <AliasList aliases={user.aliases}/>
                <HoverIcon icon={<AddCircleIcon />} onClick={() => setShowAddAliasModal(true)}/>
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
            }
        }
    })
   
    // Pass data to the page via props
    return { props: { user: JSON.parse(JSON.stringify(user)) } };
}