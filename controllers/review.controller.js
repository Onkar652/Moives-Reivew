import Review from "../models/review.model.js";
import mongoose from "mongoose";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { user, movie, rating, reviewText } = req.body;

    if (rating < 1 || rating > 4) {
      return res.status(400).json({ message: "Rating must be between 1 and 4." });
    }

    const review = new Review({ user, movie, rating, reviewText });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user movie");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user movie");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    if (rating && (rating < 1 || rating > 4)) {
      return res.status(400).json({ message: "Rating must be between 1 and 4." });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, { rating, reviewText }, { new: true });
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Rate a review
export const rateReview = async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 1 || rating > 4) {
      return res.status(400).json({ message: "Rating must be between 1 and 4." });
    }

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.rating = rating;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
