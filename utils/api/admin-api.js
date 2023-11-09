import { apiClient } from "./base"

// ban user api call
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

// promote user to admin api call
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