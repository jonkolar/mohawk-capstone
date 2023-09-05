import { createMockContext } from "./test-db-context";

import { createUserAlias } from "@/utils/services/user-service";

import { 
    createTeam, 
    deleteTeam, 
    createTeamMatch,
    deleteTeamMatch,
    deleteTeamMatchChallenge, 
    createTeamMatchChallenge,
    createTeamPlayerInvite,
    deleteTeamPlayerInvite,
    deleteTeamPlayer,
    updatePlayerAlias,
    createTeamPost,
    deleteTeamPostLike,
    createTeamPostLike,
    createTeamPlayer
} from "@/utils/services/team-service";

let mockCtx
let ctx

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx
})

// USER
test('create an alias', async () => {
    // prepare
    const alias = {
        userId: 1,
        alias: "test",
        gameId: 1
    }

    // mock
    mockCtx.prisma.alias.create.mockResolvedValue(alias)

    // compare
    await expect(createUserAlias(ctx.prisma, alias.userId, alias.alias, alias.gameId)).resolves.toEqual({
        userId: alias.userId,
        alias: alias.alias,
        gameId: alias.gameId
    })
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


// PLAYER
test('create a team player', async () => {
    // prepare
    const player = {
        userId: 1,
        teamId: 1,
        aliasId: 1,
    }

    // mock
    mockCtx.prisma.player.create.mockResolvedValue(player)

    // compare
    await expect(createTeamPlayer(ctx.prisma, player.teamId, player.userId, player.aliasId)).resolves.toEqual({
        aliasId: player.aliasId,
        userId: player.userId,
        teamId: player.teamId,
    })
})

test('delete a team player', async () => {
    // prepare
    const player = {
        id: 1,
        userId: 1,
        teamId: 1,
    }

    // mock
    mockCtx.prisma.player.delete.mockResolvedValue(player)

    // compare
    await expect(deleteTeamPlayer(ctx.prisma, player.id)).resolves.toEqual({
        id: player.id,
        userId: player.userId,
        teamId: player.teamId,
    })
})

test('update team player alias', async () => {
    // prepare
    const player = {
        id: 1,
        aliasId: 1,
    }

    // mock
    mockCtx.prisma.player.update.mockResolvedValue(player)

    // compare
    await expect(updatePlayerAlias(ctx.prisma, player.playerId, player.aliasId)).resolves.toEqual({
        id: player.id,
        aliasId: player.aliasId
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

test('delete a team player invite', async () => {
    // prepare
    const invite = {
        id: 1,
        userId: 1,
        teamId: 1,
        date: Date.now()
    }

    // mock
    mockCtx.prisma.teamInvite.delete.mockResolvedValue(invite)

    // compare
    await expect(deleteTeamPlayerInvite(ctx.prisma, invite.id)).resolves.toEqual({
        id: invite.id,
        userId: invite.userId,
        teamId: invite.teamId,
        date: invite.date
    })
})


// MATCH
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

// POST
test('create a post', async () => {
    // prepare
    const post = {
        teamId: 1,
        content: "test content"
    }

    // mock
    mockCtx.prisma.post.create.mockResolvedValue(post)

    // compare
    await expect(createTeamPost(ctx.prisma, post.teamId, post.content)).resolves.toEqual({
        teamId: 1,
        content: "test content"
    })
})

test('create a post like', async () => {
    // prepare
    const postLike = {
        userId: 1,
        postId: 1
    }

    // mock
    mockCtx.prisma.postLike.create.mockResolvedValue(postLike)

    // compare
    await expect(createTeamPostLike(ctx.prisma, postLike.postId, postLike.userId)).resolves.toEqual({
        userId: postLike.userId,
        postId: postLike.postId
    })
})

test('delete a post like', async () => {
    // prepare
    const postLike = {
        userId: 1,
        postId: 1
    }

    // mock
    mockCtx.prisma.postLike.deleteMany.mockResolvedValue(postLike)

    // compare
    await expect(deleteTeamPostLike(ctx.prisma, postLike.postId, postLike.userId)).resolves.toEqual({
        userId: postLike.userId,
        postId: postLike.postId
    })
})

