import "jsonwebtoken";
import { Types } from "mongoose";

// JWT Payload will store ObjectId of a user
// this allows easy retrieval of user data using a jwt token
declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id: Types.ObjectId;
  }
}

// type for Schema types to extend if timestamps are on
export interface TimeStamp {
  createdAt: Date;
  updatedAt: Date;
}
