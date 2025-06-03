import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  username: string;
  rating: number | null;
  content: string;
  date: string;
  productUrl: string; 
}

const ReviewSchema: Schema<IReview> = new Schema({
  username: { type: String, required: false },
  rating: { type: Number, required: false },
  content: { type: String, required: true },
  date: { type: String, required: false },
  productUrl: { type: String, required: true },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
