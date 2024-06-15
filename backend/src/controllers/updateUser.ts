import type { MyRequestHandler } from "server";
import type UserTypes from "user";

/*
 * this controller should attempt to update the provided user attributes
 * 
 * server-side errors that should be thrown
 * - user hasn't been verified
 */
type ReqBody = UserTypes.EditableFields;
type ResBody = { data?: UserTypes.ModelWithoutPassword };
type RequestHandler = MyRequestHandler<object, ResBody, ReqBody, object>;
const updateUser: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.verifiedUser) throw new Error("Couldn't update user as no verified user was found");

    const reqBody = req.body;
    const uploadedFile = req.file;
    const verifiedUser = res.locals.verifiedUser;

    if (reqBody.username) {
      verifiedUser.username = reqBody.username;
    }

    if (reqBody.about) {
      verifiedUser.about = reqBody.about;
    }

    if (uploadedFile) {
      verifiedUser.picturePath = uploadedFile.path;
    }

    await verifiedUser.save();
    res.status(200).json({ data: verifiedUser });
  } catch (error) {
    next(error);
  }
};

export default updateUser;