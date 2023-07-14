import { useState } from "react";
import { useSession } from "next-auth/react"

import { db } from "@/utils/db-server";
import { invitePlayerCall, deleteTeamCall } from "@/utils/api/team-api";
import InvitePlayerModal from "@/components/InvitePlayerModal";
import PlayerTable from "@/components/PlayerTable";

import { Button } from "@mui/material";
import PostList from "@/components/PostList";
import CreatePostModal from "@/components/CreatePostModal";

export default function TeamPage({ team, posts }) {
    if (!team) {
        return <h1>Team does not exist</h1>
    }

    const { data: session, status } = useSession()

    const [showInvitePlayerModal, setShowInvitePlayerModal] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const isOwner = session ? session.user.id == team.ownerId : false

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

    return (
        <>
            <h1>{team.name} ({team.game.name})</h1>
            <p>{team.description}</p>
            <p>Owner: {team.owner.username}</p>
            <PlayerTable user={session ? session.user : null} players={team.players} isOwner={isOwner}/>
            {isOwner &&
            <>
                <Button onClick={() => setShowInvitePlayerModal(true)}>Invite Player</Button>
                <Button onClick={() => onDeleteTeamHandler(team.id)}>Delete Team</Button>
            </>
            }
            <h1>Posts</h1>
            <PostList posts={posts}/>
            {isOwner &&
            <>
                <Button onClick={() => setShowCreatePostModal(true)}>Create Post</Button>
            </>
            }
            <InvitePlayerModal open={showInvitePlayerModal} setModal={setShowInvitePlayerModal} invitePlayerHandler={onInvitePlayerHandler}/>
            <CreatePostModal open={showCreatePostModal} setModal={setShowCreatePostModal} team={team}/>
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

    const posts = JSON.parse(JSON.stringify(await db.post.findMany({
        where: {
            teamId: parseInt(teamId)
        },
        orderBy: [
            {
                date: 'desc'
            }
        ]
    })))
   
    // Pass data to the page via props
    return { props: { team: team, posts: posts } };
}