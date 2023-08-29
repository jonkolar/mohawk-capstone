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