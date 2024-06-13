import { Router } from "express";
import { body } from "express-validator";

import register from "../controllers/register";
import login from "../controllers/login";
import logout from "../controllers/logout";
import handleValidation from "../middleware/handleValidation";
import verifyToken from "../middleware/verifyToken";

const authRouter = Router();

// Register Validators
const registerBodyStrFields = ["email", "username", "password", "confirmPassword"];
authRouter.post("/register", registerBodyStrFields.map(field => body(field).isString()));
authRouter.post("/register", body("email").isEmail());
authRouter.post("/register", body("password").isLength({ min: 5 }));
authRouter.post("/register", body("password").custom((value, { req }) => value === req.body.confirmPassword));
authRouter.post("/register", handleValidation);

// Register Controller
authRouter.post("/register", register);

// Login Validators
const loginBodyStrFields = ["emailOrUsername", "password"];
authRouter.post("/login", loginBodyStrFields.map(field => body(field).isString()));
authRouter.post("/login", handleValidation);

// Login Controller
authRouter.post("/login", login);

// Logout Middleware and Controller
authRouter.post("/logout", verifyToken, logout);

export default authRouter;