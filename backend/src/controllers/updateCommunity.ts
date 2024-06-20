import type CommunityTypes from "community";
import type { MyRequestHandler } from "server";
import Community from "../models/communityModel";

/*
 * this controller should attempt to update the provided community attributes
 * these can only be modified by the owner user
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { name?: string };
type ReqBody = CommunityTypes.EditableFields;
type ResBody = { data?: CommunityTypes.Model };
type RequestHandler = MyRequestHandler<Params, ResBody, ReqBody, object>;
const updateCommunity: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.verifiedUser) throw new Error("Couldn't update community as no verified user was found");

    const name = req.params.name;
    if (!name) return res.status(400).json({ error: "No such community" });

    const community = await Community.findOne({ name });
    if (!community) return res.status(400).json({ error: "No such community" });

    if (community.owner !== res.locals.verifiedUser._id) return res.status(401).json({ error: "Unauthorized update" });

    const { description } = req.body;
    const uploadedFile = req.file;

    if (description) {
      community.description = description;
    }

    if (uploadedFile) {
      community.picturePath = uploadedFile.path;
    }

    await community.save();
    res.status(200).json({ data: community });
  } catch (error) {
    next(error);
  }
};

export default updateCommunity;
