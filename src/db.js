import { MongoClient } from "mongodb";

let db;
async function connectToDB(cb) {
    const url = "mongodb://localhost:27017"
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("AST_Database");
    cb();
}

//connectToDB()

export { connectToDB, db };

//This is new changes made
