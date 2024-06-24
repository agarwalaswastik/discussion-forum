import type CommunityTypes from "community";
import type { MyRequestHandler } from "server";
import Community from "../models/communityModel";

/*
 * this controller should send back as response community data of the community denoted
 * by the name param.
 */
type Params = { name?: string };
type ResBody = { data?: CommunityTypes.Model };
type RequestHandler = MyRequestHandler<Params, ResBody, object, object>;
const getCommunity: RequestHandler = async (req, res, next) => {
  try {
    const name = req.params.name;
    if (!name) return res.status(400).json({ error: "No such community" });

    const community = await Community.findOne({ name }).populate("owner", "username").populate("members", "username");
    if (!community) return res.status(400).json({ error: "No such community" });

    res.status(200).json({ data: community.toObject() });
  } catch (error) {
    next(error);
  }
};

export default getCommunity;
