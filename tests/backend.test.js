import { createMockContext } from "./test-db-context";

import { createTeam, deleteTeam, createTeamMatch, deleteTeamMatchChallenge } from "@/utils/services/team-service";

let mockCtx
let ctx

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx
})

// TEAM
test('create a team', async () => {
    // prepare
    const user = {
        id: 1
    }

    const team = {
        name: 'test team',
        gameId: 1,
        description: "test description"
    }

    // mock
    mockCtx.prisma.team.create.mockResolvedValue(team)

    // compare
    await expect(createTeam(ctx.prisma, user.id, team.name,  team.gameId, team.description)).resolves.toEqual({
        name: 'test team',
        gameId: 1,
        description: 'test description'
    })
})

test('delete a team', async () => {
    // prepare
    const team = {
        id: 1
    }

    // mock
    mockCtx.prisma.team.delete.mockResolvedValue(team)

    // compare
    await expect(deleteTeam(ctx.prisma, team.id)).resolves.toEqual({
        id: 1
    })
})

test('create a team match', async () => {
    // prepare
    const match = {
        team1Id: 1,
        team2Id: 2,
        date: Date.now()
    }

    // mock
    mockCtx.prisma.match.create.mockResolvedValue(match)

    // compare
    await expect(createTeamMatch(ctx.prisma, match.team1Id, match.team2Id)).resolves.toEqual({
        team1Id: 1,
        team2Id: 2,
        date: match.date
    })
})

test('delete a team match challenge', async () => {
    // prepare
    const matchChallenge = {
        id: 1
    }

    // mock
    mockCtx.prisma.matchChallenge.delete.mockResolvedValue(matchChallenge)

    // compare
    await expect(deleteTeamMatchChallenge(ctx.prisma, matchChallenge.id)).resolves.toEqual({
        id: 1
    })
})
