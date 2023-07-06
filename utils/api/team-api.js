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