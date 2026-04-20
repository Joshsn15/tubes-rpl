

import { productControllers } from "../controllers/productControllers";
const Router = require("express").Router();

Router.post("/add-product", productControllers.addProduct);
export default Router;