import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/Users";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 🔍 REQUIRED FIELD CHECK
    if (
      !username?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 🔍 VALIDATION
    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    console.log("Sequelize instance:", Users.sequelize);

    // 🔍 CHECK DUPLICATE EMAIL
    const existingUser = await Users.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 CREATE USER
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      role: "EMPLOYEE" 
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    // 🔥 HANDLE UNIQUE ERROR (just in case)
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    return res.status(500).json({
      message: err.message || "Internal server error"
    });
  }
};