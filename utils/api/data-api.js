import { apiClient } from "./base"

// retrieve all games api call
export async function retrieveGamesCall() {
    try {
        const response = await apiClient.get("/data/games");
        return response.data
    } catch (error) {
        return false
    }
}

// retrieve user count call
export async function retrieveUserCountCall() {
    try {
        const response = await apiClient.get("/data/user-count");
        return response.data
    } catch (error) {
        return false
    }
}