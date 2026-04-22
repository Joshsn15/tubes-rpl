
import { Router } from "express";
import { adminController } from "../controllers/adminController";

const adminRoutes: Router = Router();

adminRoutes.get("/employees", adminController.getEmployees);
adminRoutes.post("/employees", adminController.createEmployee);
adminRoutes.put("/employees/:id", adminController.updateEmployee);
adminRoutes.delete("/employees/:id", adminController.deleteEmployee);

export default adminRoutes;