import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    rateReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.put("/:id/rate", rateReview);

export default router;
