import { Schema, model } from "mongoose";
import { Product } from "common";

const productSchema = new Schema<Product>(
  {
    platform: { type: String, required: true },
    productId: { type: String, required: true },
    productUrl: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

export default model<Product>("Product", productSchema);
