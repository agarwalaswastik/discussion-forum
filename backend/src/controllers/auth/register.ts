import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import type User from "types/user";

const register = async (req: Request, res: Response) => {
  try {
    const reqBody: User.Keys = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(reqBody.password, salt);

    res.status(201).json({ passwordHash });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default register;