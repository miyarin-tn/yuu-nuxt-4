import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'

let client: MongoClient
let db: Db

export async function getDb(dbName?: string): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    console.log('✅ MongoDB connected')
  }

  if (!db && dbName) {
    db = client.db(dbName)
  } else if (!db) {
    db = client.db()
  }

  return db
}
