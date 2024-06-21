import { MyRequestHandler } from "server";
import Community from "../models/communityModel";

/*
 * this controller should attempt to make the verified user a member of the community
 * given by the params or remove the user from members list if the user is already a member
 *
 * important points
 * - owner can't join community
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { name?: string };
type RequestHandler = MyRequestHandler<Params, object, object, object>;
const memberCommunity: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.verifiedUser) throw new Error("Couldn't switch community membership as no verified user was found");

    const name = req.params.name;
    if (!name) return res.status(400).json({ error: "No such community" });

    const community = await Community.findOne({ name });
    if (!community || community.members === undefined) return res.status(400).json({ error: "No such community" });

    if (community.owner.equals(res.locals.verifiedUser._id))
      return res.status(400).json({ error: "Can't leave your owned community" });

    const index = community.members.indexOf(res.locals.verifiedUser._id);
    if (index > -1) {
      community.members.splice(index, 1);
      res.status(200).json({ message: "Successfully left community" });
    } else {
      community.members.push(res.locals.verifiedUser._id);
      res.status(200).json({ message: "Successfully entered community" });
    }

    await community.save();
  } catch (error) {
    next(error);
  }
};

export default memberCommunity;
