import * as express from "express";
import UserTypes from "user";

interface SharedLocals {
  jwtCookie?: string;
  verifiedUser?: UserTypes.Model & { _id: Types.ObjectId };
}

interface SharedResBody {
  error?: string;
  message?: string;
}

declare module "express" {
  export interface Response<ResBody> {
    json: (body: ResBody) => this;
    locals: SharedLocals;
  }
}

export type MyRequestHandler<Params, ResBody, ReqBody, Query> = (
  req: express.Request<Params, ResBody & SharedResBody, ReqBody, Query, SharedLocals>,
  res: express.Response<ResBody & SharedResBody, SharedLocals>,
  next: express.NextFunction
) => unknown;
