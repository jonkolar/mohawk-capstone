import { createMockContext } from "./test-db-context";

import { createTeam } from "@/utils/db/team-service";

let mockCtx
let ctx

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx
})

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