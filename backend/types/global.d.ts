import "jsonwebtoken";
import { Types } from "mongoose";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id: Types.ObjectId
  }
}

export interface TimeStamp {
  createdAt: Date;
  updatedAt: Date;
}