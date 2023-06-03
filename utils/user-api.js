export async function checkUsernameExistsCall(username) {
        let payload = {
            username: username
        }

        const response = await fetch(`../api/user/check-username`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

    return await response.json()
}

export async function updateUserCall(email, updateData) {
    let payload = {
        email: email,
        update: updateData  
    }

    const response = await fetch(`../api/user/update-user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    return await response.json()
}