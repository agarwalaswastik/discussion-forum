import { TimeStamp } from "global";
import { Types } from "mongoose";

// create namespace to avoid crowding the global namespace
namespace CommunityTypes {
  // important information about the community
  export interface Info {
    owner: Types.ObjectId;
    name: string;
    description?: string;
    picturePath?: string;
    members?: Types.ObjectId[];
  }

  export type EditableFields = Pick<Info, "description">;

  export type Model = Info & Partial<TimeStamp> & { _id: Types.ObjectId };
}

export default CommunityTypes;
