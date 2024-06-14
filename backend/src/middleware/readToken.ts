import type { MyRequestHandler } from "server";

type RequestHandler = MyRequestHandler<object, object, object, object>;
const readToken: RequestHandler = (req, res) => {
  if (req.cookies.jwt) res.locals.jwtCookie = `${req.cookies.jwt}`;
};

export default readToken;
