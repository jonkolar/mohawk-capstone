import { apiClient } from "./base"

export async function teamExistsCall(teamId) {
    try {
        const response = await apiClient.post("/team/exists", {
            teamId: teamId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function createTeamCall(email, name, gameId, description) {
    try {
        const response = await apiClient.post("/team/create", {
            email, email,
            name: name,
            gameId: gameId,
            description: description
        })
        return response.data
    } catch (error) {
        return false
    }
}

export async function deleteTeamCall(teamId) {
    try {
        const response = await apiClient.post("/team/delete", {
            teamId: teamId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function invitePlayerCall(username, teamId) {
    try {
        const response = await apiClient.post("/team/player/invite", {
            teamId: teamId,
            username: username
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function updatePlayerAliasCall(playerId, aliasId) {
    try {
        const response = await apiClient.post("/team/player/update-alias", {
            playerId: playerId,
            aliasId: aliasId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function playerLeaveTeamCall(playerId) {
    try {
        const response = await apiClient.post("/team/player/leave", {
            playerId: playerId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function createPostCall(teamId, content) {
    try {
        const response = await apiClient.post("/team/post/create", {
            teamId, teamId,
            content: content
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function deletePostCall(postId) {
    try {
        const response = await apiClient.post("/team/post/delete", {
            postId: postId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function retrieveTeamPostListCall(teamId, cursor=null) {
    try {
        const response = await apiClient.post("/team/post/list", {
            teamId, teamId,
            cursor: cursor
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function createPostLikeCall(postId) {
    try {
        const response = await apiClient.post("/team/post/like", {
            postId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function removePostLikeCall(postId) {
    try {
        const response = await apiClient.post("/team/post/dislike", {
            postId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function sendTeamMatchChallengeCall(senderTeamId, receiverTeamId, date) {
    try {
        const response = await apiClient.post("/team/match/send", {
            senderTeamId,
            receiverTeamId,
            date
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function acceptTeamMatchChallengeCall(matchChallengeId, team1Id, team2Id, date) {
    try {
        const response = await apiClient.post("/team/match/accept", {
            matchChallengeId,
            team1Id,
            team2Id,
            date
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function ignoreTeamMatchChallengeCall(matchChallengeId) {
    try {
        const response = await apiClient.post("/team/match/ignore", {
            matchChallengeId
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function cancelTeamMatchCall(matchId) {
    try {
        const response = await apiClient.post("/team/match/cancel", {
            matchId: matchId
        });
        return response.data
    } catch (error) {
        return false
    }
}

