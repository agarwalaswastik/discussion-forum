import { Router } from "express";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";
import verifyToken from "../middleware/verifyToken";
import startCommunity from "../controllers/startCommunity";
import getOwnedCommunities from "../controllers/getOwnedCommunities";

const communityRouter = Router();

// start community
communityRouter.post("/", verifyToken, bodyDef(["name"]), bodyStr(["name"]));
communityRouter.post("/", handleValidation, startCommunity);

// get owned communties
communityRouter.get("/owned", verifyToken, getOwnedCommunities);

export default communityRouter;
