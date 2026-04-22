import { Ledger } from "../models/Ledger";
import { fetchLedger } from "../services/ledger.service";
import { Request, Response } from "express";
export class ledgerController {

    static async getLedger(req: Request, res: Response) {
        try {
            const { startDate, endDate } = req.query;
            const ledgerData = await fetchLedger(
                startDate as string | undefined,
                endDate as string | undefined
            );
            res.json(ledgerData);
        } catch (err : any) {
            console.error(err.message);
            res.status(500).json({ message: "Failed to fetch ledger" });
        }
    };

    static async createLedger(req: Request, res: Response) {
        try {
            const { reference_type, reference_id, transaction_id, po_id, debit, credit } = req.body;
            const newLedger = await Ledger.create({
                reference_type,
                reference_id,
                transaction_id,
                po_id,
                debit,
                credit
            });
            res.status(201).json(newLedger);
        } catch (error) {
            res.status(500).json({ message: "Error creating ledger" });
        }
    }

}
