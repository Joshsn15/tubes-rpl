import { Request, Response } from 'express';
import { Products } from '../models/products';
import { StockLogs } from '../models/StockLogs';
import { sequelize } from "../../config/database";
import { Ledger } from '../models/ledger';
import { StockReports } from '../models/StockReports';
import { UUIDV4 } from 'sequelize';
import { randomUUID } from 'node:crypto';
// import { UUIDV4 } from 'sequelize';

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


    static async getReports(req: Request, res: Response) {
        try {
            const reports = await StockReports.findAll({
                include: [Products],
                order: [["createdAt", "DESC"]]
            });

            res.json({ data: reports });
            console.log(reports)

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching reports" });
        }
    }

    static async createReport(req: Request, res: Response) {
        try {
            const { products_id, actual_stock } = req.body;

            console.log("BODY:", req.body);

            const product = await Products.findByPk(products_id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const actualStockNum = Number(actual_stock);

            if (isNaN(actualStockNum)) {
                return res.status(400).json({ message: "actual_stock must be number" });
            }

            const systemStock = Number(product.getDataValue("stock"));

            const difference = actualStockNum - systemStock;

            const report = await StockReports.create({
                products_id,
                system_stock: systemStock,
                actual_stock: actualStockNum,
                difference,
                status: "PENDING"
            });

            res.json({ success: true, data: report });

        } catch (error) {
            console.error("🔥 CREATE REPORT ERROR:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async receival(req: Request, res: Response) {
        const t = await sequelize.transaction();
        try {
            const {  items } = req.body;
             const po_id = req.body.po_id || randomUUID();
            if (!po_id) throw new Error("PO ID is required");
            if (!items || items.length === 0) throw new Error("Items is required");

            let totalCost = 0;

            for (const item of items) {
                const product = await Products.findByPk(item.products_id, { transaction: t });
                if (!product) throw new Error(`Product not found: ${item.products_id}`);

                const qty = Number(item.qty || 0);
                const price = Number(product.getDataValue("price") || 0);

                product.setDataValue("stock", Number(product.getDataValue("stock") || 0) + qty);
                await product.save({ transaction: t });

                await StockLogs.create({
                    products_id: item.products_id,
                    change_type: "IN",
                    stock_qty: qty,
                    reference_type: "PURCHASE",
                    reference_id: po_id,
                }, { transaction: t });

                totalCost += qty * price;
            }

            // create ledger entry setelah loop
            await Ledger.create({
                reference_type: "PURCHASE",
                reference_id: po_id,
                debit: 0,
                credit: totalCost,
                description: `Purchase received - PO ${po_id}`,
            }, { transaction: t });

            await t.commit();
            res.json({ success: true });

        } catch (error: any) {
            await t.rollback();
            console.error("RECEIVAL ERROR:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async reportDifference(req: Request, res: Response) {
        try {
            const { products_id, actual_stock } = req.body;

            const product = await Products.findByPk(products_id);
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

    static async approveReport(req: Request, res: Response) {
        const t = await sequelize.transaction();

        try {
            const { report_id } = req.body;
            const report = await StockReports.findByPk(report_id);
            if (!report) throw new Error("Report not found");

            const product = await Products.findByPk(report.products_id);
            if (!product) throw new Error("Product not found");

            const diff = report.difference;
            product.stock += diff;
            await product.save({ transaction: t });

            await StockLogs.create({
                products_id: report.products_id,
                change_type: "ADJUST",
                stock_qty: Math.abs(diff),
                reference_type: "ADJUST", // ADJUST karena ini perubahan stock yang terjadi bukan karena transaksi keuangan, jadi reference typenya ADJUST aja        
                reference_id: report.report_id,
            }, { transaction: t });

            // ADJUST GA MASUK DI LEDGER KARENA BUKAN TRANSAKSI KEUANGAN, CUMA PERUBAHAN STOCK

            report.status = "APPROVED";
            await report.save({ transaction: t });

            await t.commit();

            res.json({ success: true });

        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: error });
        }
    }
}