import { Router, Request, Response } from "express";
import { scrapeTrendyolReviews } from "../utils/scrapeTrendyolPuppeteer";
import Review from "../models/Review";

const router: Router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;
  if (!url || !url.includes("trendyol.com")) {
    res.status(400).json({ error: "Sadece Trendyol linki destekleniyor." });
    return;
  }
  try {
    const reviews = await scrapeTrendyolReviews(url);
    const result = await Review.insertMany(reviews, { ordered: false });
    res.json({ status: "ok", count: result.length, reviews: result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
