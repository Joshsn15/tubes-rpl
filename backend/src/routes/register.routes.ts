import express from "express";
import { register } from "../controllers/register.controller";

const router = express.Router();

// POST /api/register
router.post("/", register);

export default router;