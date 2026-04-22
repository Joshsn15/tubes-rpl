

import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/Users";
import { Suppliers } from "../models/Suppliers";
import { Products } from "../models/products";
import { Transactions } from "../models/Transactions";
import { TransactionItems } from "../models/TransactionItems";
import { PurchaseOrders } from "../models/PurchaseOrders";
import { PurchaseOrderItems } from "../models/PurchaseOrderItems";
import { StockLogs } from "../models/StockLogs";
import { appConfig } from "../models/appConfig";

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
