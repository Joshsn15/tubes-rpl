import express from "express";
import { Sequelize } from "sequelize-typescript";
import cors from "cors";

import { appConfig } from "./Models/appConfig";

// MODELS
import { Users } from "./models/Users";
import { Suppliers } from "./models/Suppliers";
import { Products } from "./models/Products";
import { Transactions } from "./models/Transactions";
import { TransactionItems } from "./models/TransactionItems";
import { PurchaseOrders } from "./models/PurchaseOrders";
import { PurchaseOrderItems } from "./models/PurchaseOrderItems";

// ROUTES
import registerRoute from "./routes/register.routes";
import loginRoute from "./routes/login.routes";
import posRoutes from "./routes/pos.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 INIT SEQUELIZE FIRST
export const sequelize = new Sequelize({
  username: appConfig.database.username,
  password: appConfig.database.password,
  host: appConfig.database.host,
  database: appConfig.database.database,
  port: appConfig.database.port,
  dialect: appConfig.database.dialect,
  models: [
    Users,
    Suppliers,
    Products,
    Transactions,
    TransactionItems,
    PurchaseOrders,
    PurchaseOrderItems,
    StockLogs
  ]
});

// 🔥 WAIT FOR DB BEFORE USING ROUTES
sequelize.authenticate()
  .then(() => {
    console.log("DB CONNECTED ✅");

    // OPTIONAL BUT GOOD
    return sequelize.sync();
  })
  .then(() => {
    console.log("DB SYNCED ✅");

    console.log("REGISTERING ROUTES 🔥");

    // ✅ NOW register routes
    app.use("/api/register", registerRoute);
    app.use("/api/login", loginRoute);
    app.use("/api/pos", posRoutes);
    app.use("/api/products", productRoutes);

    // ✅ THEN start server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB ERROR ❌", err);
  });