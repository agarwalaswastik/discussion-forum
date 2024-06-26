import { Router } from "express";

import verifyToken from "../middleware/verifyToken";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";

import startConversation from "../controllers/startConversation";
import getConversations from "../controllers/getConversations";
import sendMessage from "../controllers/sendMessage";

const conversationRouter = Router();

// user should be logged in before making any requests to this route
conversationRouter.use("/", verifyToken);

// start Conversation
conversationRouter.post("/", bodyDef(["otherUsername"]), bodyStr(["otherUsername"]));
conversationRouter.post("/", handleValidation, startConversation);

// get conversations of verified user
conversationRouter.get("/", getConversations);

// send message
conversationRouter.post("/:otherUsername", bodyDef(["contents"]), bodyStr(["contents"]));
conversationRouter.post("/:otherUsername", handleValidation, sendMessage);

export default conversationRouter;
