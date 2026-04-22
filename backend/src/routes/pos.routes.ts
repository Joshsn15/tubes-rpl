import { Router } from "express";
import { checkout } from "../controllers/pos.controller";

const router:Router = Router();

router.post("/checkout", checkout);

export default router;