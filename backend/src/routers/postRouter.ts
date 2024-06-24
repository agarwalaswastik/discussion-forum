import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import storeFile from "../middleware/storeFile";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";
import createPost from "../controllers/createPost";
import getPosts from "../controllers/getPosts";
import deletePost from "../controllers/deletePost";
import votePost from "../controllers/votePost";
import getHomePosts from "../controllers/getHomePosts";

const postRouter = Router();

// create a new post
const reqFields = ["title", "contents", "communityName"];
postRouter.post("/", verifyToken, storeFile("picture"));
postRouter.post("/", bodyDef(reqFields), bodyStr(reqFields));
postRouter.post("/", handleValidation, createPost);

// query posts
postRouter.get("/", getPosts);

// get home posts
postRouter.get("/home", verifyToken, getHomePosts);

// delete post
postRouter.delete("/:id", verifyToken, deletePost);

// up/downvote post
postRouter.patch("/:id/vote", verifyToken, bodyDef(["action"]), bodyStr(["action"]));
postRouter.patch("/:id/vote", handleValidation, votePost);

export default postRouter;
