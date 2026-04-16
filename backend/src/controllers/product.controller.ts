import { Request, Response } from "express";
import { sequelize } from "../main";

export const getAllProducts = async (req, res) => {
  try {
    console.log("🚀 HIT CONTROLLER");

    console.log("Sequelize models:", Object.keys(sequelize.models));

    const ProductsModel = sequelize.models.Products;
    console.log("ProductsModel:", ProductsModel);

    const products = await ProductsModel.findAll();

    res.json(products);
  } catch (err) {
    console.error("💥 FULL ERROR:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : err
    });
  }
};