import PostTypes from "post";
import { MyRequestHandler } from "server";
import Post from "../models/postModel";

/*
 * this controller should send back as response the data of the posts that are queried
 */
type ResBody = { data?: PostTypes.Model[] };
type Query = { community?: string; author?: string };
type RequestHandler = MyRequestHandler<object, ResBody, object, Query>;
const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const { community: communityName, author: authorName } = req.query;

    const posts = await Post.find()
      .populate("author", "username")
      .populate("community", "name")
      .populate("upvoters", "username")
      .populate("downvoters", "username")
      .sort({ createdAt: -1 });

    const queriedPosts = posts.filter((post) => {
      let result: boolean = true;
      const community = post.community as unknown as { name: string } | null;
      const author = post.author as unknown as { username: string };

      if (communityName && communityName !== community?.name) result = false;
      if (authorName && authorName !== author.username) result = false;

      return result;
    });

    res.status(200).json({ data: queriedPosts.map((elem) => elem.toObject()) });
  } catch (error) {
    next(error);
  }
};

export default getPosts;
