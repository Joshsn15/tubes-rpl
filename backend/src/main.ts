import express from "express";
import { sequelize } from "./db/sequelize";
import cors from "cors";
import { appConfig } from "./models/appConfig";


// ROUTES
import registerRoute from "./routes/register.routes";
import loginRoute from "./routes/login.routes";
import posRoutes from "./routes/pos.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());
app.use(cors());

sequelize;

console.log("SEQUELIZE ID:", sequelize.getDialect?.());
console.log("MODELS:", Object.keys(sequelize.models));

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