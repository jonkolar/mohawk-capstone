

export async function createTeam(db, ownerId, name, gameId, description) {
    const newTeam = await db.team.create({
        data: {
            ownerId: ownerId,
            name: name,
            gameId: gameId,
            description: description
        }
      })
    
    return newTeam;
}