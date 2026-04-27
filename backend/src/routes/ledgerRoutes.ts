import { LedgerController } from "../controllers/ledgerController";

const Router = require("express").Router();

// GET /api/ledger
Router.get("/", LedgerController.getLedger);
Router.post("/add-ledger", LedgerController.createLedger);
export default Router;