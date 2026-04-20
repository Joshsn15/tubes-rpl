import { Products } from '../models/Products';
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

    
}
