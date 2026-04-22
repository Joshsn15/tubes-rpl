import { register } from "../controllers/registerController";

const Router = require("express").Router();

// POST /api/register
Router  .post("/register", register);

export default Router;