import express from "express";
import { Sequelize } from "sequelize-typescript";
import cors from "cors";

import { appConfig } from "./Models/appConfig";

// MODELS
import { Users } from "./Models/Users";
import { Suppliers } from "./Models/Suppliers";
import { Products } from "./Models/Products";
import { Transactions } from "./Models/Transactions";
import { TransactionItems } from "./Models/TransactionItems";
import { PurchaseOrders } from "./Models/PurchaseOrders";
import { PurchaseOrderItems } from "./Models/PurchaseOrderItems";
import { StockLogs } from "./Models/StockLogs";


// ROUTES
import registerRoute from "./routes/registerRoutes";
import loginRoute from "./routes/loginRoutes";
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
    app.use("/api", registerRoute);
    app.use("/api", loginRoute);
    app.use("/api", posRoutes);
    app.use("/api/products", productRoutes);

    // ✅ THEN start server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB ERROR ❌", err);
  });