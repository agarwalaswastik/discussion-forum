import type { MyRequestHandler } from "server";
import type UserTypes from "user";
import type { Types } from "mongoose";
import type { TimeStamp } from "global";

import bcrypt from "bcryptjs";

import User from "../models/userModel";
import generateToken from "../middleware/generateToken";

/*
 * this controller should create a new user in the database
 *
 * important points
 * - username and email are unique fields
 * - password should be stored as a salted hash
 *
 * server-side errors that should be thrown
 * - user creds havn't been validated
 */
type AddToDBReqBody = Partial<UserTypes.Keys>;
type AddToDBRequestHandler = MyRequestHandler<object, object, AddToDBReqBody, object>;
const addToDatabase: AddToDBRequestHandler = async (req, res, next) => {
  try {
    const reqBody = req.body;
    if (!reqBody.email || !reqBody.username || !reqBody.password)
      throw new Error("Coudn't register user as no/incomplete creds were found");

    const user = await User.findOne({ $or: [{ email: reqBody.email }, { username: reqBody.username }] });
    if (user) {
      if (user.email === reqBody.email) res.status(400).json({ error: "Email already exists" });
      else res.status(400).json({ error: "Username already exists" });

      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(reqBody.password, salt);

    const newUser = new User({ ...reqBody, password: passwordHash });
    if (newUser) {
      await newUser.save();
      res.locals.verifiedUser = newUser;
      next();
    } else res.status(400).json({ error: "Invalid data" });
  } catch (error) {
    next(error);
  }
};

/*
 * this controller should send a 201 created response to the client with the _id,
 * username, and email of the verified user
 */
type ResBody = { data: { _id: Types.ObjectId; email: string; username: string } & Partial<TimeStamp> };
type RequestHandler = MyRequestHandler<object, ResBody, object, object>;
const sendCreatedResponse: RequestHandler = (_req, res) => {
  const userData = res.locals.verifiedUser!;
  res.status(201).json({
    data: {
      _id: userData._id,
      email: userData.email,
      username: userData.username,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    },
  });
};

const register = [addToDatabase, generateToken, sendCreatedResponse];

export default register;
