import type { MyRequestHandler } from "server";

import { body, validationResult } from "express-validator";

// check if given fields exist in request body and are strings
export const bodyStr = (fields: string[]) => fields.map((field) => body(field, `${field} isn't a string`).isString());

// check if there is a valid email field in the request body
export const bodyEmail = () => body("email", "Invalid email").isString().isEmail();

// check if there is a valid password field in the request body
export const bodyPassword = () => body("password", "Weak password").isString().isLength({ min: 5 });

// check if given fields a and b have the same value
export const bodyEqual = (a: string, b: string) =>
  body(a, `${a} is not equal to ${b}`).custom((value, { req }) => value === req[b]);

// check if given field is undefined
export const bodyUndef = (field: string) =>
  body(field, `${field} cannot be used`).custom((value) => value === undefined);

/*
 * this middleware should collect the results of all the validators and send a
 * bad response code to the client with the error message of the first validation error
 */
type RequestHandler = MyRequestHandler<object, object, object, object>;
const handleValidation: RequestHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else res.status(400).json({ error: result.array()[0].msg });
};

export default handleValidation;
