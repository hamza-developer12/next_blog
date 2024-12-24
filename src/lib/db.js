const { MongoClient } = require("mongodb");

if(!process.env.DB_URI) {
  throw new Error('DB_URI environment variable must be set');
}
const client = new MongoClient(process.env.DB_URI);

async function getDb(dbName) {
    try {
        await client.connect();
        return client.db(dbName);
    }catch(err) {
        console.error(err);
        throw new Error('Failed to connect to database');
    }
}

export async function getCollection(collectionName){
    const db = await getDb(process.env.DB_NAME);
    if(db) return db.collection(collectionName);
    return null;
}