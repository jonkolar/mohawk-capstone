import { useSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client";
import { Avatar, Badge } from "flowbite-react";

import TopNavbar from "@/components/TopNavbar"

export default function UsersPage({ user }) {
    if (!user) {
        return <h1>User does not exist</h1>
    }

    const { data: session } = useSession()

    const isOwnProfile = session ? session.user.username == user.username : false

    return (
        <> 
            <TopNavbar session={session}/>
            <div class="flex">
                <Avatar 
                    img={user.image}
                    size="xl"
                    rounded
                />
                <div>
                    <h1>{user.username} {isOwnProfile && "(YOUR PROFILE)"}</h1>
                    <ul>
                        {user.aliases.map(alias => {
                            return <li><Badge color="gray" size="sm">{alias.game.name + ' : ' + alias.alias}</Badge></li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res, query }) {
    const username = query.username

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
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