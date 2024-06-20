import type { MyRequestHandler } from "server";
import Community from "../models/communityModel";

/*
 * this controller should attempt to get all the owned communities name and pictures of the verified user
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
interface ResBody {
  data?: { name: string; picturePath?: string }[];
}
type RequestHandler = MyRequestHandler<object, ResBody, object, object>;
const getOwnedCommunities: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Communities couldn't be retrieved as no verified user was found");

    const communities = await Community.find({ owner: user._id }).select("name picturePath");
    if (!communities) return res.status(400).json({ error: "No communities found" });

    res.status(200).json({ data: communities });
  } catch (error) {
    next(error);
  }
};

export default getOwnedCommunities;
