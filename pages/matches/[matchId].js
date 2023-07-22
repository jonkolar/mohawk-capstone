import { useState } from "react";
import { useSession } from "next-auth/react"
import moment from "moment";


import { db } from "@/utils/db-server";
import { cancelTeamMatchCall } from "@/utils/api/team-api";
import Link from "@/components/Link";

import { Box, Button } from "@mui/material";

export default function UsersPage({ match }) {
    if (!match) {
        return <h1>Match does not exist</h1>
    }

    const { data: session } = useSession()

    const isTeamOwner = session ? match.team1.ownerId == session.user.id || match.team2.ownerId == session.user.id : false

    const onCancelMatchClickedHandler = async () => {
        await cancelTeamMatchCall(match.id)
            .then(data =>{
                if (data) {
                    location.reload();
                } else {
                    console.log("An error as occured")
                }
            })
    }

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <h1>MATCH ({match.id})</h1>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'start', gap: 2, justifyContent: 'center', marginBottom: 5}}>
                <div>
                    <h1>{match.team1.name}</h1> 
                    <ul>
                    { match.team1.players.map(p => <li><Link href={"/users/" + p.user.username}>{`${p.user.username} (${p.alias.alias})`}</Link></li>) }
                    </ul>
                </div>
                <h1>VS</h1>
                <div>
                    <h1>{match.team2.name}</h1>
                    <ul>
                    { match.team2.players.map(p => <li><Link href={"/users/" + p.user.username}>{`${p.user.username} (${p.alias.alias})`}</Link></li>) }
                    </ul>
                </div>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <i>{moment(match.date).format("MMM Do YYYY")}</i>
                {isTeamOwner && <Button onClick={() => onCancelMatchClickedHandler()}>Cancel</Button>}
            </Box>
        </Box>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res, query }) {
    const matchId = query.matchId
    
    let match = await db.match.findUnique({
        where: {
            id: parseInt(matchId)
        },
        include: {
            team1: {
                include: {
                    players: {
                        include: {
                            alias: true,
                            user: true
                        }
                    }
                }
            },
            team2: {
                include: {
                    players: {
                        include: {
                            alias: true,
                            user: true
                        }
                    }
                }
            },
        }
    })
    if (match) match.date = JSON.parse(JSON.stringify(match.date))
   
    // Pass data to the page via props
    return { props: { match: match } };
}