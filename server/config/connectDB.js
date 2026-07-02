import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected...");
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export const ConnectDB = connectDB;
