import { apiClient } from "./base"

// check if username exists api call
export async function checkUsernameExistsCall(username) {
    try {
        const response = await apiClient.post("/user/check-username", {
            username: username
        })
        return response.data
    } catch (error) {
        return false
    }
}

// check if user exists api call
export async function checkUserExistsCall(username) {
    try {
        const response = await apiClient.post("/user/exists", {
            username: username
        })
        return response.data
    } catch (error) {
        return false
    }
}

// update user api call
export async function updateUserCall(email, updateData) {
    try {
        const response = await apiClient.post("/user/update-user", {
            email: email,
            update: updateData
        })
        return response.data
    } catch (error) {
        return false
    }
}

// accept user team invite api call
export async function userAcceptTeamInviteCall(inviteId, answer, aliasId="") {
    try {
        const response = await apiClient.post("/user/invite-answer", {
            inviteId: inviteId,
            answer: answer,
            aliasId: aliasId
        })
        return response.data
    } catch (error) {
        return false
    }
}

// add user alias api call
export async function userAddAliasCall(gameId, alias) {
    try {
        const response = await apiClient.post("/user/alias/create", {
            gameId: gameId,
            alias: alias
        })
        return response.data
    } catch (error) {
        return false
    }
}

// delete user alias api call
export async function userDeleteAliasCall(aliasId) {
    try {
        const response = await apiClient.post("/user/alias/delete", {
            aliasId: aliasId
        })
        return response.data
    } catch (error) {
        return false
    }
}

// retrieve all user aliases api call
export async function userRetrieveAllAliasCall(userId, gameId = null) {
    try {
        const response = await apiClient.post("/user/alias/all", {
            userId: userId,
            gameId: gameId
        })
        return response.data
    } catch (error) {
        return false
    }
}