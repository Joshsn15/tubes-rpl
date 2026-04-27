import { Request, Response } from "express";
import { Products } from "../models/products";
import { TransactionItems } from "../models/TransactionItems";
import { Transactions } from "../models/Transactions";
import { StockLogs } from "../models/StockLogs";
import { sequelize } from "../../config/database";
import { Ledger } from "../models/ledger";

export const checkout = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const { cart, payment_method } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Hitung total + validasi dulu semua item sebelum insert apapun
    let total = 0;
    const resolvedItems: { product: Products; qty: number }[] = [];

    for (const item of cart) {
      const product = await Products.findByPk(item.products_id, { transaction: t });

      if (!product) throw new Error(`Product not found: ${item.products_id}`);
      if (product.stock < item.qty) throw new Error(`Insufficient stock for ${product.products_name}`);

      total += Number(product.price) * item.qty;
      resolvedItems.push({ product, qty: item.qty });
    }

    // ✅ Buat 1 transaksi setelah total selesai dihitung
    const trx = await Transactions.create({
      transaction_code: `TRX-${Date.now()}`,
      total_price: total,
      payment_method: payment_method || "CASH",
    }, { transaction: t });

    // ✅ Insert items, kurangi stock, log semua dalam 1 loop
    for (const { product, qty } of resolvedItems) {
      await TransactionItems.create({
        transaction_id: trx.transaction_id,
        products_id: product.products_id,
        qty,
        price: product.price, // snapshot harga saat ini
      }, { transaction: t });

      product.stock -= qty;
      await product.save({ transaction: t });

      await StockLogs.create({
        products_id: product.products_id,
        change_type: "OUT",
        stock_qty: qty,
        reference_type: "SALE",
        reference_id: trx.transaction_id, // ✅ fix dari 0
      }, { transaction: t });
    }

    // ✅ Insert ledger setelah semua beres
    await Ledger.create({
      reference_type: "SALE",
      reference_id: trx.transaction_id,
      debit: total,
      credit: 0,
      description: `Sale - ${trx.transaction_code}`,
    }, { transaction: t });

    await t.commit();

    return res.status(200).json({
      message: "Checkout success",
      transaction_id: trx.transaction_id,
      transaction_code: trx.transaction_code,
      total,
    });

  } catch (error: any) {
    await t.rollback();
    return res.status(400).json({
      message: error.message || "Checkout failed",
    });
  }
};