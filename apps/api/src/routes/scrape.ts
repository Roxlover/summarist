import express from "express";
import { scrapeTrendyolReviews } from "../utils/scrapeTrendyolPuppeteer";
const router = express.Router();

router.post(
  "/",
  (async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Lütfen bir URL gönderin." });

    try {
      const reviews = await scrapeTrendyolReviews(url);
      res.json({ status: "ok", count: reviews.length, reviews });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }) as express.RequestHandler
);

export default router;
