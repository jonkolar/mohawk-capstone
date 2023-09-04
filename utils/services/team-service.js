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
export async function getTeamMatch(db, matchId) {
    const match = await db.match.findUnique({
        where: {
            id: matchId
        },
        include: {
            team1: true,
            team2: true
        }
      })

    return match;
}


// PLAYER INVITE
export async function createTeamPlayerInvite(db, userId, teamId){
    const newInvite = await db.teamInvite.create({
        data: {
          userId: userId,
          teamId: teamId
        }
    })

    return newInvite;
}

// PLAYER
export async function deleteTeamPlayer(db, playerId) {
    const deletedPlayer = await db.player.delete({
        where: {
            id: playerId
        }
    })

     return deletedPlayer;
}

// PLAYER ALIAS
export async function updatePlayerAlias(db, playerId, newAliasId) {
    const updatedAlias = await db.player.update({
        where: {
          id: playerId,
        },
        data: {
          aliasId: newAliasId,
        },
      })

    return updatedAlias;
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

export async function deleteTeamMatch(db, matchId) {
    const deletedMatch = await db.match.delete({
        where: {
            id: matchId
        }
    })

    return deletedMatch;
}

// MATCH CHALLENGE
export async function createTeamMatchChallenge(db, senderTeamId, receiverTeamId, date) {
    const newMatchChallenge = await db.matchChallenge.create({
        data: {
            senderTeamId: senderTeamId,
            receiverTeamId: receiverTeamId,
            date: date
        }
      })

    return newMatchChallenge;
}

export async function deleteTeamMatchChallenge(db, matchChallengeId) {
    const deletedChallenge = await db.matchChallenge.delete({
        where: {
          id: matchChallengeId
        }
    })

    return deletedChallenge;
}