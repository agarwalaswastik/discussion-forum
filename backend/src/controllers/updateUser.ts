import type { MyRequestHandler } from "server";
import type UserTypes from "user";

import bcrypt from "bcryptjs";

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
    if (!res.locals.verifiedUser || !res.locals.verifiedUserPassword)
      throw new Error("Couldn't update user as no verified user was found");

    const reqBody = req.body;
    const uploadedFile = req.file;
    const verifiedUser = res.locals.verifiedUser;
    const verifiedUserPassword = res.locals.verifiedUserPassword;

    if (reqBody.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(reqBody.password, salt);
      verifiedUserPassword.password = passwordHash;
      await verifiedUserPassword.save();
    }

    if (typeof reqBody.about === "string") {
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
