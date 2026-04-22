import { Request, Response } from "express";
import { Products } from "../models/products";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("🚀 HIT CONTROLLER");

    const products = await Products.findAll(); // ✅ clean

    res.json(products);
  } catch (err) {
    console.error("💥 FULL ERROR:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : err
    });
  }
};

export const updateProductPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    console.log("Product ID:", id);
    console.log("New Price:", price);

    // validation
    if (price === undefined || price === null) {
      return res.status(400).json({
        message: "Price is required"
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative"
      });
    }

    // find product
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // update price
    product.price = price;
    await product.save();

    return res.status(200).json({
      message: "Price updated successfully",
      product
    });
  } catch (error: any) {
    console.error("UPDATE PRICE ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};