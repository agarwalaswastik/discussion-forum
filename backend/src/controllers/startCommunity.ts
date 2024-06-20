import CommunityTypes from "community";
import Community from "../models/communityModel";
import type { MyRequestHandler } from "server";

/*
 * this controller should attempt to create a community with the name given in the request body
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 * - name hasn't been validated
 */
type ReqBody = { name?: string };
type ResBody = { data?: CommunityTypes.Model };
type RequestHandler = MyRequestHandler<object, ResBody, ReqBody, object>;
const startCommunity: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error("Community couldn't be started as no name was found");

    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Community couldn't be started as no verified user was found");

    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) return res.status(400).json({ error: "Community already exists" });

    const newCommunity = new Community({ owner: user._id, name });
    if (!newCommunity) return res.status(400).json({ error: "Invalid data" });

    await newCommunity.save();
    res.status(201).json({ data: newCommunity.toObject() });
  } catch (error) {
    next(error);
  }
};

export default startCommunity;
