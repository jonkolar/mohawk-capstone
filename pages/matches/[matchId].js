import { useState } from "react";
import { useSession } from "next-auth/react"
import moment from "moment";
import { db } from "@/utils/db-server";

import { makeStyles } from "@mui/styles";
import { Avatar, Box, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddAliasModal from "@/components/AddAliasModal";
import AliasList from "@/components/AliasList";
import HoverIcon from "@/components/HoverIcon";
import Link from "@/components/Link";

const useStyles = makeStyles({
    iconHover: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
})

export default function UsersPage({ match }) {
    if (!match) {
        return <h1>Match does not exist</h1>
    }

    const classes = useStyles();

    console.log(match)

    const { data: session } = useSession()

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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <i>{moment(match.date).format("MMM Do YYYY")}</i>
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
    match.date = JSON.parse(JSON.stringify(match.date))
   
    // Pass data to the page via props
    return { props: { match: match } };
}