import { Router } from "express";
import handleValidation, { bodyDef, bodyStr } from "../middleware/handleValidation";
import verifyToken from "../middleware/verifyToken";
import startCommunity from "../controllers/startCommunity";
import getOwnedCommunities from "../controllers/getOwnedCommunities";
import storeFile from "../middleware/storeFile";
import updateCommunity from "../controllers/updateCommunity";
import getCommunity from "../controllers/getCommunity";
import deleteCommunity from "../controllers/deleteCommunity";

const communityRouter = Router();

// start community
communityRouter.post("/", verifyToken, bodyDef(["name"]), bodyStr(["name"]));
communityRouter.post("/", handleValidation, startCommunity);

// get owned communties
communityRouter.get("/owned", verifyToken, getOwnedCommunities);

// update community
communityRouter.patch("/:name", verifyToken, storeFile("picture"));
communityRouter.patch("/:name", handleValidation, updateCommunity);

// get community
communityRouter.get("/:name", getCommunity);

// delete community
communityRouter.delete("/:name", deleteCommunity);

// switch community membership
communityRouter.patch("/:name");

export default communityRouter;
