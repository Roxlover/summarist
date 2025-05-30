import { Schema, model } from "mongoose";
import { Review } from "common";

const reviewSchema = new Schema<Review>(
  {
    productId: { type: String, required: true },
    platformReviewId: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    raw: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export default model<Review>("Review", reviewSchema);
