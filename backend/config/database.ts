import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../src/appConfig';
import { Ledger } from '../src/models/Ledger';
import { Products } from '../src/models/Products';
import { PurchaseOrderItems } from '../src/models/PurchaseOrderItems';
import { PurchaseOrders } from '../src/models/PurchaseOrders';
import { StockLogs } from '../src/models/StockLogs';
import { Suppliers } from '../src/models/Suppliers';
import { TransactionItems } from '../src/models/TransactionItems';
import { Transactions } from '../src/models/Transactions';
import { Users } from '../src/models/Users';

export const sequelize = new Sequelize({
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.database,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: appConfig.database.dialect,
    models: [
        Ledger,
        Products,
        PurchaseOrderItems,
        PurchaseOrders,
        StockLogs,
        Suppliers,
        TransactionItems,
        Transactions,
        Users
    ]
});