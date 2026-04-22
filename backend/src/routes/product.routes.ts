import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller";
import { updateProductPrice } from "../controllers/product.controller";

const router: Router = Router();

console.log("PRODUCT ROUTES LOADED ✅");

router.get("/", getAllProducts);
router.patch("/:id", updateProductPrice);

export default router;