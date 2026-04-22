import express from "express";
import { register } from "../controllers/register.controller";
import { Router } from "express";

const router:Router = Router();

// POST /api/register
router.post("/", register);

export default router;