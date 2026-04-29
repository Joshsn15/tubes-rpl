import { Dialect } from "sequelize"

const pe = process.env

export const appConfig = {
    database: {
        username: pe.DB_USERNAME ?? "postgres",
        password: pe.DB_PASSWORD ?? "8888",
        host: pe.DB_HOST ?? "postgres-service",
        database: pe.DB_NAME ?? "tubes_rpl_minimarket",
        port: parseInt(pe.DB_PORT ?? "5432"),   // tambah ini
        dialect: (pe.DB_DIALECT ?? "postgres") as Dialect
    },
    server: {
        port: parseInt(pe.SERVER_PORT ?? "3000")
    }
}