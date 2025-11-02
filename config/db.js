import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, promise: null};

export default async function connectDB(){
    if(cached.conn) return cached.conn;
    
    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    if(!cached.promise){
        cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose);
    }
    try {
        cached.conn = await cached.promise;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = null;
        throw error;
    }
    return cached.conn
}