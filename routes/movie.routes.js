import { Router } from "express";
import Movie from "../models/movies.model.js";

const movieRouter = Router();

// Get all movies
movieRouter.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();  // Fetch all movies from MongoDB
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default movieRouter;
