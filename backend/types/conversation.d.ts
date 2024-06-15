import { TimeStamp } from "global";
import { Types } from "mongoose";

// create namespace to avoid crowding the global namespace
namespace ConversationTypes {
  // a message that is sent in a direct message
  export interface MessageInfo {
    sender: Types.ObjectId;
    sentAt: Date;
    contents: string;
  }

  // important information about the conversation
  export interface Info {
    contacter: Types.ObjectId;  // initial contacter
    responder: Types.ObjectId;  // initial responder
    messages: MessageInfo[];
  }

  // contacter/responder is independent from sender/receiver
  // contacter refers to the user that initially started the conversation
  // sender refers to the user that sent a message in that conversation
  // so, responder may be a sender for some messages

  // representation of shape of data stored in the database
  export type Model = Info & Partial<TimeStamp> & { _id: Types.ObjectId };
}

export default ConversationTypes;