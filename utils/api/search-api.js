import { apiClient } from "./base"

export async function searchTeamsCall(search, cursor=null) {
    try {
        const response = await apiClient.post("/search/teams", {
            search,
            cursor
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function searchPostsCall(search, cursor=null) {
    try {
        const response = await apiClient.post("/search/posts", {
            search,
            cursor
        });
        return response.data
    } catch (error) {
        return false
    }
}

export async function searchUsersCall(search, cursor=null) {
    try {
        const response = await apiClient.post("/search/users", {
            search,
            cursor
        });
        return response.data
    } catch (error) {
        return false
    }
}