import type { MyRequestHandler } from "server";
import type UserTypes from "user";
import User from "../models/userModel";

/*
 * this controller should send back as response user data of the user denoted
 * by the username param
 */
type Params = { username?: string };
type ResBody = { data?: UserTypes.ModelWithoutPassword };
type RequestHandler = MyRequestHandler<Params, ResBody, object, object>;
const getUser: RequestHandler = async (req, res, next) => {
  try {
    const username = req.params.username;
    if (!username) return res.status(400).json({ error: "Invalid username" });

    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(400).json({ error: "No such user" });

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export default getUser;
