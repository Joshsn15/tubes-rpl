import "dotenv/config";
import { Dialect } from "sequelize";

export const appConfig = {
  database: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "120506",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres"
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  }
};