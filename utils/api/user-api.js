import { apiClient } from "./base"

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

export async function userAcceptTeamInviteCall(inviteId, answer) {
    try {
        const response = await apiClient.post("/user/invite-answer", {
            inviteId: inviteId,
            answer: answer
        })
        return response.data
    } catch (error) {
        return false
    }
}