import mongoose, { connect } from "mongoose";
    

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

async function dbConnect() {
    if (cached.conn) {
        console.log("Using existing connection");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = connect(MONGODB_URI!).then((c) => c.connection);
    }

    try {
        cached.conn = await cached.promise;
        console.log("New connection established");
    } catch (err) {
        throw err;
    }

    return cached.conn;
}

export default dbConnect;


