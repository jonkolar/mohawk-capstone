import { useSession } from "next-auth/react"
import { db } from "@/utils/db-server";

export default function TeamPage({ team }) {
    if (!team) {
        return <h1>Team does not exist</h1>
    }

    const { data: session } = useSession()

    //const isOwnProfile = session ? session.user.username == user.username : false

    console.log(team)

    return (
        <>
            <h1>{team.name}</h1>
            <p>{team.description}</p>
        </>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res, query }) {
    const teamId = query.teamId
    
    const team = await db.team.findUnique({
        where: {
            id: parseInt(teamId)
        },
        // include: {
        //     aliases: {
        //         include: {
        //             game: true
        //         }
        //     }
        // }
    })
   
    // Pass data to the page via props
    return { props: { team: team } };
}