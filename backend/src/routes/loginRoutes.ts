import express, { Router } from "express";
import { login } from "../controllers/loginController";

const loginRoutes: Router = express.Router();

// POST /api/login
loginRoutes.post("/login", login);

export default loginRoutes;