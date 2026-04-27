import { checkout } from "../controllers/pos.controllertest";
// import { checkout } from "../controllers/pos.controllert";

const Router = require("express").Router();

Router.post("/checkout", checkout);

export default Router;