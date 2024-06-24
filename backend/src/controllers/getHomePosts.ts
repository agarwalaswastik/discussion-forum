import type PostTypes from "post";
import type { MyRequestHandler } from "server";
import Post from "../models/postModel";
import CommunityTypes from "community";

/*
 * this controller should send back as response the data of the posts that are in the
 * communities joined by the verified user
 */
type ResBody = { data?: PostTypes.Model[] };
type RequestHandler = MyRequestHandler<object, ResBody, object, object>;
const getHomePosts: RequestHandler = async (_req, res, next) => {
  try {
    const user = res.locals.verifiedUser;
    if (!user) throw new Error("Home posts couldn't be retrieved as no verified user was found");

    const posts = await Post.find()
      .populate("author", "username")
      .populate("community")
      .populate("upvoters", "username")
      .populate("downvoters", "username")
      .sort({ createdAt: -1 });

    const queriedPosts = posts.filter((post) => {
      const postComm = post.community as unknown as CommunityTypes.Model | null;
      return postComm && postComm.members?.includes(user._id);
    });

    res.status(200).json({ data: queriedPosts.map((elem) => elem.toObject()) });
  } catch (error) {
    next(error);
  }
};

export default getHomePosts;
