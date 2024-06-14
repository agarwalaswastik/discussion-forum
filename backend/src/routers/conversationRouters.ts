import { Router } from "express";
import { body } from "express-validator";

import verifyToken from "../middleware/verifyToken";
import handleValidation from "../middleware/handleValidation";
import startConversation from "../controllers/startConversation";
import getConversations from "../controllers/getConversations";
import sendMessage from "../controllers/sendMessage";

const conversationRouter = Router();

conversationRouter.use("/", verifyToken);

// Start Conversation Validators
conversationRouter.post("/", body("otherUsername").isString());
conversationRouter.post("/", handleValidation);

// Start Conversation Controller
conversationRouter.post("/", startConversation);

// Get conversations controller
conversationRouter.get("/", getConversations);

// Send message validators
conversationRouter.post("/:otherUsername", body("contents").isString());
conversationRouter.post("/:otherUsername", handleValidation);

// Send message
conversationRouter.post("/:otherUsername", sendMessage);


export default conversationRouter;