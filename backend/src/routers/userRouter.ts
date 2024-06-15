import { Router } from "express";

import getUser from "../controllers/getUser";
import updateUser from "../controllers/updateUser";
import verifyToken from "../middleware/verifyToken";
import storeFile from "../middleware/storeFile";
import handleValidation, { bodyUndef } from "../middleware/handleValidation";

const userRouter = Router();

// get user information
userRouter.get("/:username", getUser);

// update user information
// user needs to be verified before any changes to profile can be made
// store picture if it was provided
// email/username cannot be changed
userRouter.patch("/", verifyToken, storeFile("picture"), bodyUndef("email"), bodyUndef("username"));
userRouter.patch("/", handleValidation, updateUser);

export default userRouter;