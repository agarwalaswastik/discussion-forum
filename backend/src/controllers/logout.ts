import type { MyRequestHandler } from "server";

/*
 * this controller should log the user out by deleting the jwt cookie
 */
type RequestHandler = MyRequestHandler<object, object, object, object>;
const logout: RequestHandler = (_req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export default logout;
