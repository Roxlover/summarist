import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  platform: String,
  productUrl: String,
  productId: String,
  platformReviewId: String,
  username: String,
  rating: Number,
  content: String,
  date: String,
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);