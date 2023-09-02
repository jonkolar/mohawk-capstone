import { createMockContext } from "./test-db-context";

let mockCtx
let ctx

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx
})

test('should create a game', async () => {
    // model Game {
    //     id      String      @id @default(cuid())
    //     name    String
    //     image   String?
    //     aliases Alias[]
    //     teams Team[]
    //   }

    const game = {
        name: 'Test Game',
    }
    mockCtx.prisma.game.create.mockResolvedValue(game)

    await expect(ctx.prisma.game.create(game)).resolves.toEqual({
        name: 'Test Game'
        })
})