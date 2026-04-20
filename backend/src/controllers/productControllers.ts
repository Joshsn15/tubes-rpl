import { Products } from '../models/Products';
import { Request, Response } from 'express';
export class productControllers {
    static async addProduct(req: Request, res: Response) {
        try {
            const { name, category, price, stock, manufactureDate, expiryDate } = req.body;
            const product = await Products.create({
                name,
                category,
                price,
                stock,
                manufactureDate,
                expiryDate,
            });
            res.json({ message: "Product added successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error adding product" });
        }
    }
}