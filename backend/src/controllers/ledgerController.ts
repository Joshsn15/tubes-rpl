import { Request, Response } from "express";
import { Ledger } from "../models/ledger";
import { fetchLedger } from "../services/ledger.service";

export class LedgerController {

    static async getLedger(req: Request, res: Response) {
        try {
            const { startDate, endDate } = req.query;
            const ledgerData = await fetchLedger(
                startDate as string | undefined,
                endDate as string | undefined
            );
            res.json(ledgerData);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).json({ message: "Failed to fetch ledger" });
        }
    }

    // manual create ledger kalau emang butuh — tapi normalnya
    // ledger diisi otomatis dari checkout / PO received, bukan dari sini
    static async createLedger(req: Request, res: Response) {
        try {
            const { reference_type, reference_id, debit, credit, description } = req.body;

            if (!reference_type || !reference_id) {
                return res.status(400).json({ message: "reference_type and reference_id are required" });
            }

            const newLedger = await Ledger.create({
                reference_type,
                reference_id,
                debit: debit ?? 0,
                credit: credit ?? 0,
                description,
            });

            res.status(201).json(newLedger);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).json({ message: "Error creating ledger" });
        }
    }
}