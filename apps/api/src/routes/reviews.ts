import express, { Request, Response } from "express";
import Review from "../models/Review";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;

    const filter = productId ? { productId } : {};
    
    const reviews = await Review.find(filter).sort({ date: -1 });

    res.json({ count: reviews.length, reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;