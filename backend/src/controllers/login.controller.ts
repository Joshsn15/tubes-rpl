import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../Models/Users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await Users.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // ✅ CHECK ENV FIRST
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    // ✅ GENERATE TOKEN
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // ✅ RETURN CORRECT STRUCTURE
    return res.status(200).json({
      message: "Login successful",
      token, // ✅ TOP LEVEL (IMPORTANT)
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (err: any) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      message: err.message || "Internal server error"
    });
  }
};

