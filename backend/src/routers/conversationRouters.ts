import { Router } from "express";

import verifyToken from "../middleware/verifyToken";
import handleValidation, { bodyStr } from "../middleware/handleValidation";

import startConversation from "../controllers/startConversation";
import getConversations from "../controllers/getConversations";
import sendMessage from "../controllers/sendMessage";

const conversationRouter = Router();

conversationRouter.use("/", verifyToken);

// Start Conversation
conversationRouter.post("/", bodyStr(["otherUsername"]));
conversationRouter.post("/", handleValidation, startConversation);


// Get conversations
conversationRouter.get("/", getConversations);

// Send message
conversationRouter.post("/:otherUsername", bodyStr(["contents"]));
conversationRouter.post("/:otherUsername", handleValidation, sendMessage);

export default conversationRouter;
