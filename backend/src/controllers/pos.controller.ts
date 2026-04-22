import { Request, Response } from "express";
import { Products } from "../models/products";
import { TransactionItems } from "../models/TransactionItems";
import { Transactions } from "../models/Transactions";
import { StockLogs } from "../models/StockLogs";
import { sequelize } from "../../config/database";
export const checkout = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    for (const item of cart) {
      const product = await Products.findByPk(item.products_id, { transaction: t });

      if (!product) {
        throw new Error(`Product not found: ${item.products_id}`);
      }

      if (product.stock < item.qty) {
        throw new Error(`Insufficient stock for ${product.products_name}`);
      }

      // 💰 calculate total
      total += Number(product.price) * item.qty;

      //create transaction
      const trx = await Transactions.create({
        transaction_code: `TRX-${Date.now()}`,   // ✅ REQUIRED
        total_price: total,                      // ✅ REQUIRED
        payment_method: req.body.payment_method || "CASH", // ✅ REQUIRED
      }, { transaction: t });

      // 📉 reduce stock
      product.stock -= item.qty;
      await product.save({ transaction: t });

      // 🧾 create transaction item
      await TransactionItems.create({
        transaction_id: trx.transaction_id,
        products_id: product.products_id,
        qty: item.qty,
        price: product.price,
      }, { transaction: t });

      console.log(
        "ATTRIBUTES:",
        Object.keys(TransactionItems.getAttributes())
      );

      // 📊 log stock
      await StockLogs.create({
        products_id: product.products_id,
        change_type: "OUT",
        stock_qty: item.qty,
        reference_type: "SALE",
        reference_id: 0, // you can replace with transaction id later
      }, { transaction: t });
    }

    await t.commit();

    return res.status(200).json({
      message: "Checkout success",
      total,
    });

  } catch (error: any) {
    console.error("💥 ERROR NAME:", error.name);
  console.error("💥 ERROR MSG:", error.message);
  console.error("💥 FULL:", error);

  await t.rollback();

  return res.status(400).json({
    message: error.message || "Checkout failed",
  });
  }
};