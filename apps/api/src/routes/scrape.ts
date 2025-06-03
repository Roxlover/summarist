import express, { Request, Response } from "express";
import { scrapeTrendyolReviews } from "../utils/scrapeTrendyolPuppeteer";
import Review from "../models/Review";
const router = express.Router();

router.post(
  "/",
  (async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Lütfen bir URL gönderin." });

    try {
      const reviews = await scrapeTrendyolReviews(url);

      const reviewsWithUrl = reviews.map((review) => ({
        ...review,
        productUrl: url,
      }));

      const result = await Review.insertMany(reviewsWithUrl, { ordered: false });

      res.json({ status: "ok", inserted: result.length, reviews: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }) as express.RequestHandler
);

export default router;
