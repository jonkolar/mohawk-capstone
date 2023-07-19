import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"

import { db } from "@/utils/db-server";
import { invitePlayerCall, deleteTeamCall } from "@/utils/api/team-api";
import { retrieveTeamPostListCall } from "@/utils/api/team-api";
import InvitePlayerModal from "@/components/InvitePlayerModal";
import PlayerTable from "@/components/PlayerTable";

import { Button } from "@mui/material";
import PostList from "@/components/PostList";
import CreatePostModal from "@/components/CreatePostModal";

export default function TeamPage({ team, initialPosts }) {
    if (!team) {
        return <h1>Team does not exist</h1>
    }

    const { data: session, status } = useSession()

    const [showInvitePlayerModal, setShowInvitePlayerModal] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const [posts, setPosts] = useState(initialPosts.posts)
    const [postsOffset, setPostsOffset] = useState(0);
    const [postsCursor, setPostsCursor] = useState(initialPosts.posts.length > 0 ? initialPosts.posts.at(-1).id : null);
    const [isMorePosts, setIsMorePosts] = useState(initialPosts.more);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(!initialPosts.more);

    const isOwner = session ? session.user.id == team.ownerId : false;
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
            <h1>Posts:</h1>
            {isOwner &&
                <Button onClick={() => setShowCreatePostModal(true)}>Create Post</Button>
            }
            <PostList user={session ? session.user : null} posts={posts.slice(postsOffset, postsOffset + postsToDisplay)}/>
            <div>
                <Button onClick={() => onPrevPostsHandler()} disabled={prevButtonDisabled}>Prev</Button>
                <Button onClick={() => onNextPostsHandler()} disabled={nextButtonDisabled}>Next</Button>
            </div>
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

    const initialPosts = JSON.parse(JSON.stringify(await db.post.findMany({
        take: 3,
        where: {
            teamId: parseInt(teamId)
        },
        include: {
            likes: true
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
   
    // Pass data to the page via props
    return { props: { team: team, initialPosts: {
        posts: initialPosts,
        more: isMore ? true : false
    }} };
}