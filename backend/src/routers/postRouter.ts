import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import storeFile from "../middleware/storeFile";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";
import createPost from "../controllers/createPost";

const postRouter = Router();

// create a new post
const reqFields = ["title", "contents", "communityName"];
postRouter.post("/", verifyToken, storeFile("picture"));
postRouter.post("/", bodyDef(reqFields), bodyStr(reqFields));
postRouter.post("/", handleValidation, createPost);

export default postRouter;
