import { Op } from "sequelize";
import { Ledger } from "../models/Ledger";
import { Transactions } from "../models/Transactions";
import { PurchaseOrders } from "../models/PurchaseOrders";

export const fetchLedger = async (startDate?: string, endDate?: string) => {
    const where: any = {};

    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt[Op.gte] = new Date(startDate);
        if (endDate)   where.createdAt[Op.lte] = new Date(endDate + "T23:59:59");
    }

    const data = await Ledger.findAll({
        where,
        include: [
            { model: Transactions, attributes: ["transaction_code", "total_price", "payment_method", "transaction_date"] },
            { model: PurchaseOrders, attributes: ["total_cost", "status"] },
        ],
        order: [["createdAt", "ASC"]],
    });

    return data;
};