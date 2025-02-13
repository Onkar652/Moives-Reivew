import { config } from "dotenv";

config(); // Automatically loads the correct .env file

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!DB_URI) {
  throw new Error("❌ Missing MongoDB URI! Please check your .env file.");
}
