import type { MyRequestHandler } from "server";

/*
 * this middleware should read the jwt token from request cookies and
 * set res.locals.jwtCookie to it
 */
type RequestHandler = MyRequestHandler<object, object, object, object>;
const readToken: RequestHandler = (req, res) => {
  if (req.cookies.jwt) res.locals.jwtCookie = `${req.cookies.jwt}`;
};

export default readToken;
