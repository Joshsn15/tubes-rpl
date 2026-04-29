import express from "express";
import "dotenv/config";
import cors from "cors"

console.log("ENV CHECK:");
console.log("USER:", process.env.DB_USERNAME);
console.log("PASS:", process.env.DB_PASSWORD);
console.log("DB:", process.env.DB_NAME);
// ROUTES
import registerRoute from "./routes/registerRoutes";
import loginRoute from "./routes/loginRoutes";
import productRoute from "./routes/productRoutes";
import stockRoute from "./routes/stockRoutes";
import ledgerRoute from "./routes/ledgerRoutes";
import adminRoute from "./routes/adminRoutes";
import { sequelize } from "../config/database";

import posRoutes from "./routes/pos.routes";
const app = express();
app.use(express.json());
app.use(cors());


sequelize
sequelize.authenticate()
  .then(() => {
    console.log("DB CONNECTED ✅");

    return sequelize.sync();
  })
  .then(() => {
    console.log("DB SYNCED ✅");

    console.log("REGISTERING ROUTES 🔥");

    // ✅ NOW register routes
    app.use("/api", registerRoute);
    app.use("/api", loginRoute);
    app.use("/api/products",productRoute);
    app.use("/api/stock",stockRoute);
    app.use("/api/ledger",ledgerRoute);
    app.use("/api/admin",adminRoute);
    app.use("/api", posRoutes);
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("DB ERROR ❌", err);
  });
