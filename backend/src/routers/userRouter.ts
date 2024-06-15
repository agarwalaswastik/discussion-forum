import { Router } from "express";

import getUser from "../controllers/getUser";

const userRouter = Router();

// get user information
userRouter.get("/:username", getUser);

export default userRouter;