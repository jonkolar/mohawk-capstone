import { createMockContext } from "./test-db-context";

import { 
    createTeam, 
    deleteTeam, 
    createTeamMatch,
    deleteTeamMatch,
    deleteTeamMatchChallenge, 
    createTeamMatchChallenge,
    createTeamPlayerInvite
} from "@/utils/services/team-service";

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

test('create a team player invite', async () => {
    // prepare
    const invite = {
        userId: 1,
        teamId: 1,
        date: Date.now()
    }

    // mock
    mockCtx.prisma.teamInvite.create.mockResolvedValue(invite)

    // compare
    await expect(createTeamPlayerInvite(ctx.prisma, 1, invite.userId, invite.teamId)).resolves.toEqual({
        userId: invite.userId,
        teamId: invite.teamId,
        date: invite.date
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

test('cancel a team match', async () => {
    // prepare
    const match = {
        id: 1,
        team1Id: 1,
        team2Id: 2,
        date: Date.now()
    }

    // mock
    mockCtx.prisma.match.delete.mockResolvedValue(match)

    // compare
    await expect(deleteTeamMatch(ctx.prisma, match.id)).resolves.toEqual({
        id: 1,
        team1Id: 1,
        team2Id: 2,
        date: match.date
    })
})

test('create a team match challenge', async () => {
    // prepare
    const matchChallenge = {
        senderTeamId: 1,
        receiverTeamId: 2,
        date: Date.now()
    }

    // mock
    mockCtx.prisma.matchChallenge.create.mockResolvedValue(matchChallenge)

    // compare
    await expect(createTeamMatchChallenge(ctx.prisma, matchChallenge.senderTeamId, matchChallenge.receiverTeamId)).resolves.toEqual({
        senderTeamId: matchChallenge.senderTeamId,
        receiverTeamId: matchChallenge.receiverTeamId,
        date: matchChallenge.date
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
