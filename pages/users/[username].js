import { useSession } from "next-auth/react"
import { db } from "@/utils/db-server";

import { Avatar, Stack } from "@mui/material";

import TopNavbar from "@/components/TopNavbar"
import AliasList from "@/components/AliasList";

export default function UsersPage({ user }) {
    if (!user) {
        return <h1>User does not exist</h1>
    }

    const { data: session } = useSession()

    const isOwnProfile = session ? session.user.username == user.username : false

    console.log(user.aliases)

    return (
        <>
            <TopNavbar session={session}/>
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
            </Stack>
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
    return { props: { user: user } };
}