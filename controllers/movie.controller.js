import Movie from "../models/movies.model.js";

export const addMovies = async (req, res, next) => {
    try {
        const movies = req.body; // Expecting an array of movies
        
        if (!Array.isArray(movies) || movies.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid movie data" });
        }

        const newMovies = await Movie.insertMany(movies); // Insert multiple movies

        res.status(201).json({
            success: true,
            message: `${movies.length} movies added successfully`,
            data: newMovies
        });

    } catch (error) {
        next(error);
    }
};
