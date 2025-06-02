import express, { RequestHandler } from "express";
import * as productsController from "../controllers/productsController";


const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProduct as RequestHandler);
router.post("/", productsController.createProduct as RequestHandler);

export default router;
