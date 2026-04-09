import express from "express";
import { register } from "../controllers/registerController";

const router = express.Router();

// POST /api/register
router.post("/register", register);

export default router;