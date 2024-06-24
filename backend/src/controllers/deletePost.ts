import type { MyRequestHandler } from "server";
import Post from "../models/postModel";
import Community from "../models/communityModel";

/*
 * this controller should attempt to delete the provided post. Can only be deleted by the
 * owner of the community or the original poster
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { id?: string };
type RequestHandler = MyRequestHandler<Params, object, object, object>;
const deletePost: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.verifiedUser) throw new Error("Couldn't delete post as no verified user was found");
    const user = res.locals.verifiedUser;

    const _id = req.params.id;
    if (!_id) return res.status(400).json({ error: "Invalid post id" });

    const post = await Post.findById(_id);
    if (!post) return res.status(400).json({ error: "Invalid post id" });

    if (post.author.equals(user._id)) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted successfully" });
    }

    const community = await Community.findById(post.community);
    if (!community) return res.status(400).json({ error: "No such community" });

    if (post.author.equals(community.owner)) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted successfully" });
    }

    res.status(401).json({ error: "Unauthorized delete" });
  } catch (error) {
    next(error);
  }
};

export default deletePost;
