import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from "../config/env.js";

// Check if the DB_URI is missing
if (!DB_URI) {
  throw new Error('Please check the MongoDB URI inside .env <development, production>.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to the database in ${NODE_ENV} mode`);  // Fixed string interpolation
  } catch (error) {
    console.error("Something went wrong:", error);  // Log the error properly
    process.exit(1);  // Exit the process in case of failure
  }
};

export default connectToDatabase;
