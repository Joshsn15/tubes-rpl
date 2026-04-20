    import { Router } from 'express';
    import { stockControllers } from '../controllers/stockControllers';

    const stockRoutes: Router = Router();

    stockRoutes.get("/", stockControllers.getStock);

    stockRoutes.get("/reports", stockControllers.getReports);
    stockRoutes.post("/create", stockControllers.createReport);

    stockRoutes.post("/approve-report", stockControllers.approveReport);

    stockRoutes.post("/receival", stockControllers.receival);

    export default stockRoutes;