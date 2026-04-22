import { checkout } from "../controllers/pos.controller";

const Router = require("express").Router();

Router.post("/checkout", checkout);

export default Router;