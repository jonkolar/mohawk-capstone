import { useState } from "react";
import { useSession } from "next-auth/react"

import { db } from "@/utils/db-server";
import { invitePlayerCall } from "@/utils/api/team-api";
import InvitePlayerModal from "@/components/InvitePlayerModal";

import { Button } from "@mui/material";

export default function TeamPage({ team }) {
    if (!team) {
        return <h1>Team does not exist</h1>
    }

    console.log(team)

    const [showInvitePlayerModal, setShowInvitePlayerModal] = useState(false);

    const { data: session } = useSession()

    const isOwner = session ? session.user.id == team.ownerId : false

    const onInvitePlayerHandler = async (username) => {
        await invitePlayerCall(username, team.id)
            .then(data => {
                setShowInvitePlayerModal(false)
            })
    }

    return (
        <>
            <h1>{team.name} ({team.game.name})</h1>
            <p>{team.description}</p>
            <p>Owner: {team.owner.username}</p>
            <ul>
                { team.players.map(player => <li key={player.id}>{player.user.username} | {player.alias.alias}</li> )}
            </ul>
            {isOwner &&
                <Button onClick={() => setShowInvitePlayerModal(true)}>Invite Player</Button>
            }
            <InvitePlayerModal open={showInvitePlayerModal} setModal={setShowInvitePlayerModal} invitePlayerHandler={onInvitePlayerHandler}/>
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
        include: {
            players: {
                include: {
                    user: true,
                    alias: true,
                }
            },
            game: true,
            owner: true
        },
    })
   
    // Pass data to the page via props
    return { props: { team: team } };
}