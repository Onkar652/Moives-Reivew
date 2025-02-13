import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import reviewRouter from "./routes/reviews.routes.js";  
import connectToDatabase from "./database/mogodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import movieRouter from "./routes/movie.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend to access the backend
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Fixed missing parentheses

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);  
app.use("/api/v1/movies", movieRouter);
// Error Handling Middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World!");  
});

// Connect to DB first, then start the server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});

export default app;
