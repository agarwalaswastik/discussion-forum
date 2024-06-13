import { NextFunction, Request, Response, Router } from "express";
import ev from "express-validator";
import register from "src/controllers/auth/register";

const authRouter = Router();

// Register Validators
const registerBodyStrFields = ["email", "username", "password", "confirmPassword"];
authRouter.post("/register", registerBodyStrFields.map(field => ev.body(field).isString()));
authRouter.post("/register", ev.body("email").isEmail());
authRouter.post("/register", ev.body("password").isLength({ min: 5 }));
authRouter.post("/register", ev.body("password").custom((value, { req }) => value === req.body.confirmPassword));

authRouter.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const result = ev.validationResult(req);
  if (result.isEmpty()) next();
  res.status(400).json({ errors: result.array() });
});

// Register Controller
authRouter.post("/register", register);

export default authRouter;