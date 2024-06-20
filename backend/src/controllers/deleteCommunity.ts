import type { MyRequestHandler } from "server";
import Community from "../models/communityModel";

/*
 * this controller should attempt to delete the provided community. Can only be deleted by the
 * owner
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { name?: string };
type RequestHandler = MyRequestHandler<Params, object, object, object>;
const deleteCommunity: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.verifiedUser) throw new Error("Couldn't delete community as no verified user was found");

    const name = req.params.name;
    if (!name) return res.status(400).json({ error: "No such community" });

    const community = await Community.findOne({ name });
    if (!community) return res.status(400).json({ error: "No such community" });

    if (community.owner !== res.locals.verifiedUser._id) return res.status(401).json({ error: "Unauthorized delete" });

    await community.deleteOne();
    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteCommunity;
