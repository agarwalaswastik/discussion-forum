import type { MyRequestHandler } from "server";

import { body, validationResult } from "express-validator";

export const bodyStr = (fields: string[]) => fields.map((field) => body(field, `${field} isn't a string`).isString());
export const bodyEmail = () => body("email", "Invalid email").isString().isEmail();
export const bodyPassword = () => body("password", "Weak password").isString().isLength({ min: 5 });
export const bodyEqual = (a: string, b: string) =>
  body(a, `${a} is not equal to ${b}`).custom((value, { req }) => value === req[b]);


type RequestHandler = MyRequestHandler<object, object, object, object>;
const handleValidation: RequestHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else res.status(400).json({ error: result.array()[0].msg });
};

export default handleValidation;
