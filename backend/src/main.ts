import express from "express";
import { Sequelize } from "sequelize-typescript";
import cors from 'cors';
import { appConfig } from "./models/appConfig";

// MODELS
import { Users } from "./models/Users";
import { Suppliers } from "./models/Suppliers";
import { Products } from "./models/Products";
import { Transactions } from "./models/Transactions";
import { TransactionItems } from "./models/TransactionItems";
import { PurchaseOrders } from "./models/PurchaseOrders";
import { PurchaseOrderItems } from "./models/PurchaseOrderItems";
import { StockLogs } from "./models/StockLogs";

// ROUTES
import registerRoute from "./routes/registerRoutes";
import loginRoute from "./routes/loginRoutes";
import productRoute from "./routes/productRoutes";
import stockRoute from "./routes/stockRoutes";
import ledgerRoute from "./routes/ledgerRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
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

sequelize.authenticate()
  .then(() => {
    console.log("DB CONNECTED ✅");

    return sequelize.sync();
  })
  .then(() => {
    console.log("DB SYNCED ✅");

    // ✅ NOW register routes
    app.use("/api", registerRoute);
    app.use("/api", loginRoute);
    app.use("/api/products",productRoute);
    app.use("/api/stock",stockRoute);
    app.use("/api/ledger",ledgerRoute);
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB ERROR ❌", err);
  });
