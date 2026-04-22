import { Products } from '../models/products';
import { Request, Response } from 'express';
export class productControllers {
    static async addProduct(req: Request, res: Response) {
        try {
            const { products_name, category, price, stock, manufacture_date, expiry_date } = req.body;
            const product = await Products.create({
                products_name,
                category,
                price,
                stock,
                manufacture_date,
                expiry_date,
            });
            res.json({ message: "Product added successfully", product });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getProduct(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const product = await Products.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products" });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await Products.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products" });
        }
    }
    static async updateProductPrice(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
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
}
