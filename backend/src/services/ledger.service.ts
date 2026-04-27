import { Op } from "sequelize";
import { Ledger } from "../models/ledger";

export const fetchLedger = async (startDate?: string, endDate?: string) => {
    const where: any = {};

    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt[Op.gte] = new Date(startDate);
        if (endDate)   where.createdAt[Op.lte] = new Date(endDate + "T23:59:59");
    }

    const data = await Ledger.findAll({
        where,
        order: [["createdAt", "ASC"]],
    });

    return data;
};