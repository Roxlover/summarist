import { Router } from "express";
import * as reviewsController from "../controllers/reviewsController";

const router = Router();

router.get("/", reviewsController.getAllReviews);
router.get("/:id", (req, res, next) => {
  Promise.resolve(reviewsController.getReview(req, res)).catch(next);
});
router.post("/", reviewsController.createReview);

export default router;
