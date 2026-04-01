import express from "express";
import { appConfig } from "./Models/appConfig";
import { Sequelize } from "sequelize-typescript";
import { Customer } from "./Models/Customer";
import { StockLogs } from "./Models/StockLogs";
import { PurchaseOrderItems } from "./Models/PurchaseOrderItems";
import { PurchaseOrders } from "./Models/PurchaseOrders";
import { TransactionItems } from "./Models/TransactionItems";
import { Transactions } from "./Models/Transactions";
import { Products } from "./Models/Products";
import { Suppliers } from "./Models/Suppliers";


const app = express();
app.use(express.json());

const sequelize = new Sequelize({
    username : appConfig.database.username,
    password : appConfig.database.password,
    host : appConfig.database.host,
    database : appConfig.database.database, 
    port : appConfig.database.port,
    dialect : appConfig.database.dialect,
    models : [Customer, Suppliers, Products, Transactions, TransactionItems, PurchaseOrders, PurchaseOrderItems, StockLogs  ]    
}
)
sequelize

