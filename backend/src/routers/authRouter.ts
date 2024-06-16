import { Router } from "express";

import register from "../controllers/register";
import login from "../controllers/login";
import logout from "../controllers/logout";

import handleValidation, { bodyEmail, bodyEqual, bodyPassword, bodyStr } from "../middleware/handleValidation";
import verifyToken from "../middleware/verifyToken";

const authRouter = Router();

// register
authRouter.post("/register", bodyEmail(), bodyPassword());
authRouter.post("/register", bodyStr(["username"]));
authRouter.post("/register", bodyEqual("password", "confirmPassword"));
authRouter.post("/register", handleValidation, register);

// login
authRouter.post("/login", bodyStr(["emailOrUsername", "password"]));
authRouter.post("/login", handleValidation, login);

// logout
// user should be logged in to make a logout request
authRouter.post("/logout", verifyToken, logout);

export default authRouter;