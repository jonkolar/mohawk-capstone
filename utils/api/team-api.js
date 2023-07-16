import { apiClient } from "./base"

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