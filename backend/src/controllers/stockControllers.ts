import { Request, Response } from 'express';
import { Products } from '../models/Products';
import { StockLogs } from '../models/StockLogs';
import { sequelize } from "../../config/database";
import { Ledger } from '../models/Ledger';

export class stockControllers {
    static async getStock(req: Request, res: Response) {
        try {
            const products = await Products.findAll();

            res.json({
                success: true,
                data: products
            });

        } catch (error) {
            res.status(500).json({ message: "Error fetching stock" });
        }
    }

    static async receival(req: Request, res: Response) {
        const t = await sequelize.transaction();

        try {
            const { items } = req.body;

            for (const item of items) {
                const product = await Products.findByPk(item.product_id);

                if (!product) throw new Error("Product not found");

                // tambah stock
                product.stock += item.qty;
                await product.save({ transaction: t });

                // insert stock log
                await StockLogs.create({
                    product_id: item.product_id,
                    change_type: "IN",
                    stock_qty: item.qty,
                    reference_type: "PURCHASE"
                }, { transaction: t });

                // insert ledger (expense)
                await Ledger.create({
                    reference_type: "PURCHASE",
                    reference_id: item.product_id,
                    debit: item.qty * product.price,
                    credit: 0
                }, { transaction: t });
            }

            await t.commit();

            res.json({ success: true, message: "Stock updated" });

        } catch (error) {
            await t.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async reportDifference(req: Request, res: Response) {
        try {
            const { product_id, actual_stock } = req.body;

            const product = await Products.findByPk(product_id);
            if (!product) throw new Error("Product not found");

            const difference = actual_stock - product.stock;

            res.json({
                success: true,
                system_stock: product.stock,
                actual_stock,
                difference
            });

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async approveAdjustment(req: Request, res: Response) {
        const t = await sequelize.transaction();

        try {
            const { product_id, actual_stock } = req.body;

            const product = await Products.findByPk(product_id);
            if (!product) throw new Error("Product not found");

            const diff = actual_stock - product.stock;

            // update stock
            product.stock = actual_stock;
            await product.save({ transaction: t });

            // stock log
            await StockLogs.create({
                product_id,
                change_type: "ADJUST",
                stock_qty: diff,
                reference_type: "MANUAL"
            }, { transaction: t });

            // ledger (kalau rugi)
            if (diff < 0) {
                await Ledger.create({
                    reference_type: "ADJUST",
                    reference_id: product_id,
                    debit: 0,
                    credit: Math.abs(diff) * product.price
                }, { transaction: t });
            }

            await t.commit();

            res.json({ success: true });

        } catch (error) {
            await t.rollback();
            res.status(500).json({ message: error });
        }
    }
}