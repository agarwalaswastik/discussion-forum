import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import register from "../controllers/register";

const authRouter = Router();

// Register Validators
const registerBodyStrFields = ["email", "username", "password", "confirmPassword"];
authRouter.post("/register", registerBodyStrFields.map(field => body(field).isString()));
authRouter.post("/register", body("email").isEmail());
authRouter.post("/register", body("password").isLength({ min: 5 }));
authRouter.post("/register", body("password").custom((value, { req }) => value === req.body.confirmPassword));

authRouter.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(400).json({ errors: result.array() });
});

// Register Controller
authRouter.post("/register", register);

export default authRouter;