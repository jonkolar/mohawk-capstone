import { PrismaClient } from '@prisma/client'

let db;

// check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  // check if there is already a connection to the database
  if (!global.db) {
    global.db = new PrismaClient() // create new connection
  }
  db = global.db // return existing connection to database
}

export { db };