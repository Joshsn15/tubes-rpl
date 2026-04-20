import { productControllers } from "../controllers/productControllers";
const Router = require("express").Router();

Router.post("/add-product", productControllers.addProduct);
Router.get("/:id", productControllers.getProduct)
export default Router;