import type PostTypes from "post";
import { MyRequestHandler } from "server";
import Community from "../models/communityModel";
import Post from "../models/postModel";

/*
 * this controller should attempt to create a post with the given fields
 *
 * important points
 * - poster should be a member of the community
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 * - fields havn't been validated
 */
interface ReqBody {
  title?: string;
  contents?: string;
  communityName?: string;
}
type ResBody = { data?: PostTypes.Model };
type RequestHandler = MyRequestHandler<object, ResBody, ReqBody, object>;
const createPost: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Post couldn't be created as no verified user was found");

    const { title, contents, communityName } = req.body;
    if (!title || !contents || !communityName)
      throw new Error("Post couldn't be created as relevant data couldn't be found");

    const uploadedFilePath = req.file?.path;

    const community = await Community.findOne({ name: communityName });
    if (!community || !community.members) return res.status(400).json({ error: "No such community" });

    const isMember = community.members.reduce((res, curr) => res || curr._id.equals(user._id), false);
    if (!isMember && !user._id.equals(community.owner)) return res.status(401).json({ error: "Unauthorized post" });

    const newPost = new Post({
      author: user._id,
      community: community._id,
      title,
      contents,
      picturePath: uploadedFilePath,
    });
    if (!newPost) return res.status(400).json({ error: "Invalid data" });

    await newPost.save();
    res.status(201).json({ data: newPost.toObject() });
  } catch (error) {
    next(error);
  }
};

export default createPost;
