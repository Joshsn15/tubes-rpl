import {Router} from "express";
import { login } from "../controllers/login.controller";

const router:Router = Router();

// POST /api/login
router.post("/", login);

export default router;