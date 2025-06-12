import express, { RequestHandler } from "express";
import { scrapeTrendyolReviews } from "../utils/scrapeTrendyolPuppeteer";
import scrapeHepsiburadaReviews from "../utils/scrapeHepsiburadaPuppeteer";
import Review from "../models/Review";

const router = express.Router();

const scrapeHandler: RequestHandler = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Lütfen bir URL gönderin." });
    return;
  }

  let reviews: any[] = [];
  let platform = "";

  try {
    if (url.includes("trendyol.com")) {
      platform = "trendyol";
      reviews = await scrapeTrendyolReviews(url);
    } else if (url.includes("hepsiburada.com")) {
      platform = "hepsiburada";
      reviews = await scrapeHepsiburadaReviews(url);
    } else {
      res.status(400).json({ error: "Desteklenmeyen platform." });
      return;
    }
    const reviewsWithMeta = reviews.map((review) => ({
      ...review,
      platform,
      productUrl: url,
    }));

    const result = await Review.insertMany(reviewsWithMeta, { ordered: false });
    res.json({ status: "ok", inserted: result.length, reviews: result });
    return;
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    return;
  }
};


router.post("/", scrapeHandler);

export default router;
