import { productControllers } from "../controllers/productControllers";
const Router = require("express").Router();

Router.get("/", productControllers.getAllProducts);
Router.post("/add-product", productControllers.addProduct);
Router.get("/:id", productControllers.getProduct);
Router.put("/update-price/:id", productControllers.updateProductPrice);
export default Router;