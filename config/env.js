import { config } from "dotenv";

// Load environment variables from a file based on NODE_ENV or default to 'development'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Destructure and export the PORT variable from process.env
export const { PORT, NODE_ENV, DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN
} = process.env;
