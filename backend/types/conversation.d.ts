import { TimeStamp } from "global";
import { Types } from "mongoose";

namespace ConversationTypes {
  export interface Message {
    senderId: Types.ObjectId;
    sentAt: Date;
    contents: string;
  }

  export interface Info {
    contacterId: Types.ObjectId;
    responderId: Types.ObjectId;
    messages: Message[];
  }

  export type Model = Info & Partial<TimeStamp>;
}

export default ConversationTypes;