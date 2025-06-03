import express, { Express } from "express";
import cors from "cors";
import productsRouter from "./routes/products";
import reviewsRouter from "./routes/reviews";
import scrapeRoutes from "./routes/scrape";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/scrape", scrapeRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

