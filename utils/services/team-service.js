// TEAM
export async function getTeam(db, teamId) {
    const team = await db.team.findUnique({
        where: {
          id: teamId,
        },
      })

      return team;
}

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

export async function deleteTeam(db, teamId) {
    const deletedTeam = await db.team.delete({
        where: {
          id: teamId,
        },
    })

    return deletedTeam;
}


// MATCH
export async function createTeamMatch(db, team1Id, team2Id, date) {
    const newMatch = await db.match.create({
        data: {
            team1Id: team1Id,
            team2Id: team2Id,
            date: date
        }
    })

    return newMatch;
}

export async function deleteTeamMatchChallenge(db, matchChallengeId) {
    const deletedChallenge = await db.matchChallenge.delete({
        where: {
          id: matchChallengeId
        }
    })

    return deletedChallenge;
}