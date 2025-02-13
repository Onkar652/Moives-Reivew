import mongoose from "mongoose";
import User from "./user.model.js";
import Movie from "./movies.model.js";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,  // Changed from 5 to 4
    },

    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minLength: 10,
      maxLength: 1000,
    },

    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],  
      },
    ],
  },
  { timestamps: true }
);
ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });
const Review = mongoose.model("Review", ReviewSchema);

export default Review;
