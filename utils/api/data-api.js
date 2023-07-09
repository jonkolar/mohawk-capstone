import { apiClient } from "./base"

export async function retrieveGamesCall(teamId) {
    try {
        const response = await apiClient.get("/data/games");
        return response.data
    } catch (error) {
        return false
    }
}