import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
      minLength: 2,
      maxLength: 255,
    },

    year: {
      type: Number,
      required: [true, "Release year is required"],
      min: 1800,  // Assuming movies were first created around 1800
      max: new Date().getFullYear(),  // Current year as upper limit
    },

    genre: {
      type: String,
      required: [true, "Movie genre is required"],
      trim: true,
      enum: ["Action", "Comedy", "Drama", "Horror", "Thriller", "Romance", "Sci-Fi", "Animation", "Documentary", "Fantasy"],  // Predefined list of genres
    },

    rating: {
      type: Number,
      required: [true, "Movie rating is required"],
      min: 0,
      max: 10,  // You can adjust this scale as needed
    },

    description: {
      type: String,
      required: [true, "Movie description is required"],
      minLength: 10,
      maxLength: 5000,  // Max length for the description
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Create a model for the Movie schema
const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
