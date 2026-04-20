import { Request, Response } from "express";
import { Ledger } from "../models/Ledger";
export class ledgerController {
    static async getLedger(req: Request, res: Response) {
        try {
            const ledgers = await Ledger.findAll();
            res.json(ledgers);
        } catch (error) {
            res.status(500).json({ message: "Error fetching ledger" });
        }
    }

}