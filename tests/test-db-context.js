import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export const createMockContext = () => {
  return {
    prisma: mockDeep(PrismaClient),
  }
}