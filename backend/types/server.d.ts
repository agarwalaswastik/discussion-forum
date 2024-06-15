import * as express from "express";
import UserTypes from "user";

// locals inside Response stores data to be shared between middleware
// overwrite type of locals to ensure type checking while sharing data (default type is any)
interface SharedLocals {
  jwtCookie?: string;
  verifiedUser?: UserTypes.ModelWithoutPassword & { _id: Types.ObjectId };
}

// all response objects may contain an error or a message
interface SharedResBody {
  error?: string;
  message?: string;
}

// extending the express module types
declare module "express" {
  export interface Response<ResBody> {
    json: (body: ResBody) => this; // ensure that body is given a value, default is body?: ResBody
    locals: SharedLocals; // overwriting locals type
  }
}

// custom RequestHandler type that forces declaration of Params, ResBody, ReqBody, and Query
// ensures that all of these types are properly considered in each handler
// intersect SharedResBody with given ResBody type to allow always giving an error or a message
// object can be used as a default, for eg. if no Params are to be used then put object in its place
// it doesn't matter what is returned
export type MyRequestHandler<Params, ResBody, ReqBody, Query> = (
  req: express.Request<Params, ResBody & SharedResBody, ReqBody, Query, SharedLocals>,
  res: express.Response<ResBody & SharedResBody, SharedLocals>,
  next: express.NextFunction
) => unknown;
