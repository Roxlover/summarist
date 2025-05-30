import Review from "../models/Review";
import { Request, Response } from "express";

export const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find();
  res.json(reviews);
};

export const getReview = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.json(review);
};

export const createReview = async (req: Request, res: Response) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
};
