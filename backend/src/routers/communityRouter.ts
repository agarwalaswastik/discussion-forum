import { Router } from "express";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";
import verifyToken from "../middleware/verifyToken";
import startCommunity from "../controllers/startCommunity";

const communityRouter = Router();

// start community
communityRouter.post("/", verifyToken, bodyDef(["name"]), bodyStr(["name"]));
communityRouter.post("/", handleValidation, startCommunity);

export default communityRouter;
