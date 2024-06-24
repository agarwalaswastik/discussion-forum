import { TimeStamp } from "global";
import { Types } from "mongoose";

// create namespace to avoid crowding the global namespace
namespace PostTypes {
  // important information about the post
  export interface Info {
    author: Types.ObjectId;
    community: Types.ObjectId;
    title: string;
    contents: string;
    picturePath?: string;
    upvoters?: Types.ObjectId[];
    downvoters?: Types.ObjectId[];
  }

  // representation of shape of data stored in the database
  export type Model = Info & Partial<TimeStamp> & { _id: Types.ObjectId };
}

export default PostTypes;
