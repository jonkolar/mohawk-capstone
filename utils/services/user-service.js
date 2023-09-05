// USER
export async function getUser(db, criteria) {
    const user = await db.user.findUnique({
        where: criteria
    })

    return user;
}

// ALIAS
export async function createUserAlias(db, userId, alias, gameId) {
    const newAlias = await db.alias.create({
        data: {
            userId: userId,
            alias: alias,
            gameId: gameId
        }
    })

    return newAlias;
}
