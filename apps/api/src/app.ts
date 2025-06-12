import express, { Express } from "express";
import cors from "cors";
import productsRouter from "./routes/products";
import reviewsRouter from "./routes/reviews";
import scrapeRoutes from "./routes/scrape";
import summarizeRouter from "./routes/summarize";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/scrape", scrapeRoutes);
app.use("/api/summarize", summarizeRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

