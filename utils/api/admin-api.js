import { apiClient } from "./base"

export async function adminBanUserCall(username, banned) {
    try {
        const response = await apiClient.post("/admin/ban", {
            username: username,
            banned: banned
        })
        return response.data
    } catch (error) {
        return false
    }
}

export async function adminPromoteUserCall(username, promote) {
    try {
        const response = await apiClient.post("/admin/promote", {
            username: username,
            promote: promote
        })
        return response.data
    } catch (error) {
        return false
    }
}