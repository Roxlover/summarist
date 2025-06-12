import express, { RequestHandler } from "express";
import Review from "../models/Review";
import { openai } from "../utils/openai";

const router = express.Router();

const summarizeHandler: RequestHandler = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Lütfen bir ürün linki gönderin." });
    return;
  }

  let platform = "";
  let productId = "";

  if (url.includes("trendyol.com")) {
    platform = "trendyol";
    const match = url.match(/-p-(\d+)/);
    productId = match ? match[1] : "";
  } else if (url.includes("hepsiburada.com")) {
    platform = "hepsiburada";
    const match = url.match(/-p-(\d+)/);
    productId = match ? match[1] : "";
  } else {
    res.status(400).json({ error: "Desteklenmeyen platform." });
    return;
  }
  if (!productId) {
    res.status(400).json({ error: "Product ID bulunamadı!" });
    return;
  }

  const reviews = await Review.find({ productId, platform });
  if (!reviews.length) {
    res.status(404).json({ error: "Bu ürün için yorum bulunamadı." });
    return;
  }


  const reviewTexts = reviews.map(r => r.content).join("\n\n");
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: "You are a product review summarizer. Summarize all the reviews made by users, highlighting the main points to consider before purchasing the product." },
        { role: "user", content: reviewTexts }
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    const summary = completion.choices[0]?.message?.content || "";
    res.json({ summary, totalReviews: reviews.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

router.post("/", summarizeHandler);

export default router;
