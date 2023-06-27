export async function createTeamCall(email, name, gameId, description) {
    let payload = {
        email, email,
        name: name,
        gameId: gameId,
        description: description
    }

    try {
        const response = await fetch(`../api/team/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
    
        return await response.json()
    } catch (error) {
        return false
    }
}

export async function deleteTeamCall(teamId) {
    let payload = {
        teamId, teamId
    }
    
    try {
        const response = await fetch(`../api/team/delete`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
    
        return await response.json()
    } catch (error) {
        return false
    }
}