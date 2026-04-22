import { ledgerController } from "../controllers/ledgerController";
const Router = require("express").Router();

// GET /api/ledger
Router.get("/", ledgerController.getLedger);
Router.post("/add-ledger", ledgerController.createLedger);
export default Router;