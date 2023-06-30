import { apiClient } from "./base"

export async function checkUsernameExistsCall(username) {
    try {
        const response = apiClient.post("/user/check-username", {
            username: username
        })
        return response.data
    } catch (error) {
        return false
    }
}

export async function updateUserCall(email, updateData) {
    try {
        const response = apiClient.post("/user/update-user", {
            email: email,
            update: updateData
        })
        return response.data
    } catch (error) {
        return false
    }
}