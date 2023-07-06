import { PrismaClient } from '@prisma/client'

let db;

//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  notificationDb = createClient({ url: 'redis://localhost:6379' });
} else {
  //check if there is already a connection to the database
  if (!global.db) {
    global.db = new PrismaClient()
  }
  db = global.db
}

export { db };