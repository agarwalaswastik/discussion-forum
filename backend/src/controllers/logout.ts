import type { MyRequestHandler } from "server";

type RequesHandler = MyRequestHandler<object, object, object, object>;
const logout: RequesHandler = (_req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export default logout;
