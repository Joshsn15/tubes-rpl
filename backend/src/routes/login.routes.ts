import express from "express";
import { login } from "../controllers/login.controller";

const router = express.Router();

// POST /api/login
router.post("/", login);

export default router;