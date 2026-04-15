import { Router } from 'express';
import { stockControllers } from '../controllers/stockControllers';
import { stopCoverage } from 'node:v8';

const stockRoutes: Router = Router();

stockRoutes.get("/", stockControllers.getStock);
stockRoutes.post("/receival", stockControllers.receival);
stockRoutes.post("/report", stockControllers.reportDifference);
stockRoutes.post("/approve", stockControllers.approveAdjustment);

export default stockRoutes;