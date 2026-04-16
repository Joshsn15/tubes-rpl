import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller";

const router = Router();

console.log("PRODUCT ROUTES LOADED ✅");

router.get("/", getAllProducts);

export default router;