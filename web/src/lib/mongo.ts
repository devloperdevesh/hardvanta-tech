import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI);
}