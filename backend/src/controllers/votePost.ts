import type { MyRequestHandler } from "server";
import Post from "../models/postModel";

/*
 * this controller should attempt to make the verified user an upvoter/downvoter of the post
 * given by the params or remove the user from upvoters/downvoters list if the user is already an 
 * upvoter/downvoter
 *
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type Params = { id?: string };
type ReqBody = { action?: "upvote" | "downvote" };
type RequestHandler = MyRequestHandler<Params, object, ReqBody, object>;
const votePost: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Couldn't vote post as no verified user was found");

    const { id: _id } = req.params;
    if (!_id) return res.status(200).json({ error: "No such post" });

    const post = await Post.findById(_id);
    if (!post || !post.upvoters || !post.downvoters) return res.status(200).json({ error: "No such post" });

    const { action } = req.body;
    if (action !== "upvote" && action !== "downvote")
      return res.status(200).json({ error: 'action should be "upvote" or "downvote"' });

    if (action === "upvote") {
      const index = post.upvoters.indexOf(user._id);
      if (index > 1) {
        post.upvoters.splice(index, 1);
      } else {
        post.upvoters.push(user._id);
      }
    } else {
      const index = post.downvoters.indexOf(user._id);
      if (index > 1) {
        post.downvoters.splice(index, 1);
      } else {
        post.downvoters.push(user._id);
      }
    }

    await post.save();
    res.status(200).json({ message: "Successfull update" });
  } catch (error) {
    next(error);
  }
};

export default votePost;
