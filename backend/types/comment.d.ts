import { TimeStamp } from "global";
import { Types } from "mongoose";

// create namespace to avoid crowding the global namespace
namespace CommentTypes {
  // important information about the comment
  export interface Info {
    author: Types.ObjectId;
    community: Types.ObjectId;
    post: Types.ObjectId;
    parent: Types.ObjectId;
    contents: string;
    upvotes?: number;
  }

  // representation of shape of data stored in the database
  export type Model = Info & Partial<TimeStamp> & { _id: Types.ObjectId };
}

export default CommentTypes;
