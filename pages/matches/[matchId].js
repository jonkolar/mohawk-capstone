import { useSession } from "next-auth/react"
import moment from "moment";

import { db } from "@/utils/db-server";
import { cancelTeamMatchCall } from "@/utils/api/team-api";
import Link from "@/components/Link";
import BoxLabelIconTopper from "@/components/BoxLabelIconTopper";

import { Box, Button, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from "@mui/styles";
import PageNotFound from "@/components/PageNotFound";

// /matches/[matchId]

// FRONTEND
export const TeamBox = ({ team, theme }) => {
    return (
        <Box>
            <BoxLabelIconTopper icon={<GroupsIcon fontSize="medium"/>} label={team.name}/>
            <Box sx={{ width: 300, backgroundColor: theme.palette.primary.main, padding: 2, borderRadius: theme.border.radius}}>
                { team.players.length <= 0 && <Typography color={theme.palette.white}>No Players...</Typography>}
                { team.players.map(p => 
                    <Link href={"/users/" + p.user.username} key={p.id}>
                        <Typography color={theme.palette.white}>{p.user.username} (Alias: {p.alias.alias})</Typography> 
                    </Link>) 
                }
                
            </Box>
        </Box>
    )
}

export default function MatchPage({ match }) {
    const { data: session } = useSession()
    const theme = useTheme();

    const isTeamOwner = session && match ? match.team1.ownerId == session.user.id || match.team2.ownerId == session.user.id : false

    // on cancel match button clicked handler
    const onCancelMatchClickedHandler = async () => {
        await cancelTeamMatchCall(match.id)
            .then(data =>{
                if (data) {
                    location.replace("/");
                } else {
                    console.log("An error as occured")
                }
            })
    }

    return !match ? <PageNotFound label="Match Doesn't Exist" />
    : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', gap: 2, justifyContent: 'center', margin: 5, gap: 5, flexWrap: 'wrap-reverse'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center'}}>
                    <TeamBox team={match.team1} theme={theme}/>
                    <Typography variant="h4" color={theme.palette.secondary.main}>VS</Typography>
                    <TeamBox team={match.team2} theme={theme}/>
                </Box>
                <Box>
                    <BoxLabelIconTopper icon={<InfoIcon fontSize="smlll"/>} label="DETAILS"/>
                    <Box sx={{backgroundColor: theme.palette.primary.main, borderRadius: theme.border.radius, padding: 2, width: 250, flex: 1}}>
                        <Typography color={theme.palette.white}>Match Id: {match.id}</Typography>
                        <Typography color={theme.palette.white}>Date: {moment(match.date).format("MMM Do YYYY")}</Typography>
                        <Typography color={theme.palette.white}>Game: {match.team1.game.name}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isTeamOwner && <Button variant="contained" onClick={() => onCancelMatchClickedHandler()}>Cancel</Button>}
            </Box>
        </Box>
    )
}


// BACKEND
export async function getServerSideProps({ req, res, query }) {
    // query parameters
    const matchId = query.matchId
    
    // retrieve match
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
                    },
                    game: true
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
    if (match) match = JSON.parse(JSON.stringify(match))
   
    // send data to frontend
    return { props: { match: match } };
}