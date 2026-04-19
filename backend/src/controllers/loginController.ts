import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../Models/Users";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("INPUT:", email, password); // ✅ safe

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await Users.findOne({
      where: { email }
    });

    console.log("USER:", user); // ✅ AFTER declaration

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    console.log("DB PASSWORD:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      message: "Login successful",
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