import { Request, Response } from "express";
import { Users } from "../models/Users";
import { Op } from "sequelize";

export class adminController {

    static async getEmployees(req: Request, res: Response) {
        try {

            const data = await Users.findAll({
                where: {
                    role: {
                        [Op.in]: ['EMPLOYEE', 'STOCKER', 'MANAGER', 'ADMIN']
                    }
                },
                attributes: ['user_id', 'username', 'email', 'role'],
                order: [['createdAt', 'DESC']]
            });

            res.json({ success: true, data });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching employees" });
        }
    }

    static async createEmployee(req: Request, res: Response) {
        try {
            const { username, email, password, role } = req.body;

            if (!username || !email || !password || !role) {
                return res.status(400).json({ message: "All fields required" });
            }

            if (role === "ADMIN") {
                return res.status(403).json({ message: "Cannot create admin" });
            }

            const user = await Users.create({
                username,
                email,
                password,
                role
            });

            res.json({ success: true, data: user });

        } catch (error: any) {
            console.error("🔥 CREATE ERROR:", error);

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }
    static async updateEmployee(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const { username, email, role } = req.body;

            const user = await Users.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.role === "ADMIN") {
                return res.status(403).json({ message: "Cannot update admin" });
            }

            await user.update({
                username,
                email,
                role
            });

            res.json({ success: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating employee" });
        }
    }

    static async deleteEmployee(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const user = await Users.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.role === "ADMIN") {
                return res.status(403).json({ message: "Cannot delete admin" });
            }

            await user.destroy();

            res.json({ success: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting employee" });
        }
    }
}