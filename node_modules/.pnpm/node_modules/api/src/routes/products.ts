import { Router } from "express";
import * as productsController from "../controllers/productsController";
import { RequestHandler } from "express";


const router: Router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProduct as RequestHandler);
router.post("/", productsController.createProduct as RequestHandler);

export default router;
