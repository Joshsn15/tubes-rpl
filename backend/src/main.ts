import express from "express";
import cors from "cors";
import 'dotenv/config'
import { appConfig } from "./models/appConfig";
import { Sequelize } from "sequelize-typescript";
import stockRoutes from "./routes/stockRoutes";

import { StockLogs } from "./models/StockLogs";
import { PurchaseOrderItems } from "./models/PurchaseOrderItems";
import { PurchaseOrders } from "./models/PurchaseOrders";
import { TransactionItems } from "./models/TransactionItems";
import { Transactions } from "./models/Transactions";
import { Products } from "./models/Products";
import { Suppliers } from "./models/Suppliers";
import { Ledger } from "./models/Ledger";
import { Users } from "./models/Users";
import { StockReports } from "./models/StockReports";


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
        Suppliers,
        Products,
        Transactions,
        TransactionItems,
        PurchaseOrders,
        PurchaseOrderItems,
        StockLogs,
        Ledger,
        Users,
        StockReports
    ]
});

// 🔥 REGISTER ROUTES
app.use("/stock", stockRoutes);

// 🔥 START SERVER
async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB Successfully Connected");

        app.listen(3000, () => {
            console.log("server started!");
        });

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

start();