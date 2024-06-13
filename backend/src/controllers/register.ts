import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/userModel";

import type UserTypes from "user";
import generateToken from "../middleware/generateToken";

const register = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: UserTypes.Keys = req.body;

      const user = await User.findOne({ $or: [{ email: reqBody.email }, { username: reqBody.username }] });
      if (user) {
        if (user.email === reqBody.email) return res.status(400).json({ error: "Email already exists" });
        else return res.status(400).json({ error: "Username already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(reqBody.password, salt);

      const newUser = new User({ ...reqBody, password: passwordHash });
      if (newUser) {
        await newUser.save();
        res.locals.newUser = newUser.toObject();
        return next();
      } else return res.status(400).json({ error: "Invalid data" });
    } catch (error) {
      return next(error);
    }
  },
  generateToken,
  (_req: Request, res: Response) => {
    return res.status(201).json(res.locals.newUser);
  },
];

export default register;
