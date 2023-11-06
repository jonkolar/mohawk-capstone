import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"

import { db } from "@/utils/db-server";
import { invitePlayerCall, deleteTeamCall } from "@/utils/api/team-api";
import { retrieveTeamPostListCall } from "@/utils/api/team-api";

import BoxLabelIconTopper from "@/components/BoxLabelIconTopper";
import PlayerTable from "@/components/PlayerTable";
import PostList from "@/components/PostList";
import MatchList from "@/components/MatchList";
import InvitePlayerModal from "@/components/InvitePlayerModal";
import CreatePostModal from "@/components/CreatePostModal";
import SendMatchChallengeModal from "@/components/SendMatchChallengeModal";
import ReceivedMatchChallengesModal from "@/components/ReceivedMatchChallengesModal";
import PageNotFound from "@/components/PageNotFound";

import { useTheme } from '@mui/material/styles';
import { Button, Box, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from "@mui/icons-material/Groups";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function TeamPage({ team, initialPosts, matches, challenges }) {
    const theme = useTheme();

    const { data: session } = useSession()

    const [showInvitePlayerModal, setShowInvitePlayerModal] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showSendMatchChallengeModal, setShowSendMatchChallengeModal] = useState(false);
    const [showReceivedChallengesModal, setShowReceivedChallengesModal] = useState(false)

    const [posts, setPosts] = useState(initialPosts.posts)
    const [postsOffset, setPostsOffset] = useState(0);
    const [postsCursor, setPostsCursor] = useState(initialPosts.posts.length > 0 ? initialPosts.posts.at(-1).id : null);
    const [isMorePosts, setIsMorePosts] = useState(initialPosts.more);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(!initialPosts.more);

    const isOwner = session && team ? session.user.id == team.ownerId : false;
    const postsToDisplay = 3;

    const onInvitePlayerHandler = async (username) => {
        await invitePlayerCall(username, team.id)
            .then(data => {
                setShowInvitePlayerModal(false)
            })
    }

    const onDeleteTeamHandler = async (teamId) => {
        await deleteTeamCall(teamId)
            .then(data => {
                if (data) {
                    window.location.href = "/account/teams"
                } else {
                    console.log('something went wrong')
                }
            })
    }

    const onPrevPostsHandler = async () => {
        const newPostsOffset = postsOffset - postsToDisplay
        setPostsOffset(newPostsOffset);
        setNextButtonDisabled(false);
        if (newPostsOffset <= 0)
            setPrevButtonDisabled(true);
    }

    const onNextPostsHandler = async () => {
        const hitEndOfCurrentPostsList = postsOffset >= (posts.length - posts.length % postsToDisplay) - postsToDisplay
        if (hitEndOfCurrentPostsList){
                if (isMorePosts) {
                    await retrieveTeamPostListCall(team.id, postsCursor)
                    .then(data => {
                        if (data) {
                            setPosts([...posts, ...data.posts])
                            setPostsCursor(data.posts.at(-1).id)

                            if (!data.more) {
                                setNextButtonDisabled(true);
                                setIsMorePosts(false);
                            }
                        } else {
                            console.log('something went wrong')
                        }
                    })
                } else {
                    setNextButtonDisabled(true);
                }
        }

        setPostsOffset(postsOffset + postsToDisplay)
        setPrevButtonDisabled(false);
    }

    return !team ? <PageNotFound label="Team Doesn't Exist"/>
    : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3, gap: 5}}>
            <Box>
                <BoxLabelIconTopper icon={<InfoIcon fontSize="medium"/>} label="DETAILS"/>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.primary.main, 
                        borderRadius: theme.border.radius, gap: 1, padding: 3, marginTop: 0.2}}>
                    <Typography variant="h3" color={theme.palette.white}>{team.name}</Typography>
                    <Typography variant="p" color={theme.palette.white}>Game: {team.game.name}</Typography>
                    <Typography variant="p" color={theme.palette.white}>Description: {team.description}</Typography>
                </Box>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column', gap: 5, minWidth: '50%'}}>
                <Box>
                    <BoxLabelIconTopper icon={<GroupsIcon fontSize="medium"/>} label="ROSTER"/>
                    <PlayerTable user={session ? session.user : null} team={team} isOwner={isOwner}/>
                    {isOwner &&
                        <Button variant="contained" onClick={() => setShowInvitePlayerModal(true)} sx={{ marginTop: 1 }}>Invite Player</Button> }
                </Box>

                <Box sx={{display: 'flex', gap: 3, width: '100%'}}>
                    <Box sx={{ flex: 1}}>
                        <BoxLabelIconTopper icon={<ChatBubbleIcon fontSize="small"/>} label="POSTS"/>
                        <Box sx={{backgroundColor: theme.palette.primary.main, padding: 1, borderRadius: theme.border.radius, display: 'flex'}}>
                            { posts.slice(postsOffset, postsOffset + postsToDisplay).length <= 0 && 
                                <Typography sx={{color: theme.palette.white, marginLeft: 1}}>No posts...</Typography>}
                            <PostList posts={posts.slice(postsOffset, postsOffset + postsToDisplay)}/>
                        </Box>
                        <Box sx={{display: 'flex', gap: 1, marginTop: 1, justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex', gap: 0.5}}>
                                <Button variant="contained" onClick={() => onPrevPostsHandler()} disabled={prevButtonDisabled}>Prev</Button>
                                <Button variant="contained" onClick={() => onNextPostsHandler()} disabled={nextButtonDisabled}>Next</Button>
                            </Box>
                            {isOwner && <Button variant="contained" onClick={() => setShowCreatePostModal(true)}>Create Post</Button>}
                        </Box>
                    </Box>

                    <Box sx={{flex: 1}}>
                        <BoxLabelIconTopper icon={<CalendarTodayIcon fontSize="small"/>} label="MATCHES"/>
                        <Box sx={{backgroundColor: theme.palette.primary.main, padding: 3, borderRadius: theme.border.radius}}>
                            <MatchList matches={matches}/>
                        </Box>
                        {isOwner &&
                            <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: 1}}>
                                <Button variant="contained" onClick={() => setShowSendMatchChallengeModal(true)}>Send Challenge</Button>
                                <Button variant="contained" onClick={() => setShowReceivedChallengesModal(true)}>View Challenges</Button>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
            {isOwner && 
                    <Button onClick={() => onDeleteTeamHandler(team.id)} variant="contained" color="error" sx={{marginTop: 1}}>Delete Team</Button>}

            <InvitePlayerModal open={showInvitePlayerModal} setModal={setShowInvitePlayerModal} invitePlayerHandler={onInvitePlayerHandler}/>
            <CreatePostModal open={showCreatePostModal} setModal={setShowCreatePostModal} team={team}/>
            <SendMatchChallengeModal open={showSendMatchChallengeModal} setModal={setShowSendMatchChallengeModal} team={team}/>
            <ReceivedMatchChallengesModal open={showReceivedChallengesModal} setModal={setShowReceivedChallengesModal} challenges={challenges}/>
        </Box>
    )
}


// This gets called on every request
export async function getServerSideProps({ req, res, query }) {
    const teamId = query.teamId
    
    // Team
    const team = JSON.parse(JSON.stringify(await db.team.findUnique({
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
            owner: true,
        },
    })))

    // Posts
    const initialPosts = JSON.parse(JSON.stringify(await db.post.findMany({
        take: 3,
        where: {
            teamId: parseInt(teamId)
        },
        include: {
            likes: true,
            team: true
        },
        orderBy: {
            date: 'desc'
        }
    })))
    const isMore = initialPosts.length > 0 ? await db.post.findFirst({
        where: {
            teamId: parseInt(teamId),
            date: {
                lt: initialPosts.at(-1).date
            }
        }
    })
    :
    false

    // Matches
    const matches = JSON.parse(JSON.stringify(await db.match.findMany({
        where: {
            OR: [
                { team1Id: parseInt(teamId) },
                { team2Id: parseInt(teamId) }
            ],
        },
        include: {
            team1: true,
            team2: true
        },
        orderBy: {
            date: 'asc'
        }
    })))

    const challenges = JSON.parse(JSON.stringify(await db.matchChallenge.findMany({
        where: {
            receiverTeamId: parseInt(teamId)
        },
        include: {
            teamSender: true,
            teamReceiver: true
        },
        orderBy: {
            date: 'asc'
        }
    })))
   
    // Pass data to the page via props
    return { props: { 
        team: team, 
        initialPosts: {
            posts: initialPosts,
            more: isMore ? true : false
        },
        matches: matches,
        challenges: challenges
    }}
}