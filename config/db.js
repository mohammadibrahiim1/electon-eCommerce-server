// config/db.js
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log("MongoDB connection failed:", error?.message);
    process.exit(1); // Stop server on connection failure
  }
};

export default connectDB;
