import type { MyRequestHandler } from "server";
import type { Types } from "mongoose";

import bcrypt from "bcryptjs";

import generateToken from "../middleware/generateToken";
import User from "../models/userModel";


type CheckFromDBReqBody = { emailOrUsername?: string, password?: string; };
type CheckFromDBRequestHandler = MyRequestHandler<object, object, CheckFromDBReqBody, object>;
const checkFromDatabase: CheckFromDBRequestHandler = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) throw new Error("Couldn't log user in as no/incomplete creds were found");

    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) return res.status(400).json({ error: "No such account found" });

    if (await bcrypt.compare(password, user.password)) {
      res.locals.verifiedUser = user;
      return next();
    }

    res.status(400).json({ error: "Incorrect password" });
  } catch (error) {
    next(error);
  }
};

type ResBody = { data: { _id: Types.ObjectId; email: string; username: string } };
type RequestHandler = MyRequestHandler<object, ResBody, object, object>;
const sendSuccessResponse: RequestHandler = (_req, res) => {
  const userData = res.locals.verifiedUser!;
  res.status(200).json({
    data: {
      _id: userData._id,
      email: userData.email,
      username: userData.username,
    },
  });
};

const login = [
  checkFromDatabase,
  generateToken,
  sendSuccessResponse,
];

export default login;
