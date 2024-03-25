import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Api is working fine!!" });
};

export const updateUser = async (req, res, next) => {
  // first of all we need to verify the user who logged in. Inorder to do that we create verifyUser file inside utils
  console.log(req.user, "req-user from user.controller");
  console.log(req.params.user_id, "req-user-d");
  if (req.user.id !== req.params.user_id) {
    return next(errorHandler(401, "User cannot be updated"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(401, "Password should contain atleast 6 characters")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username < 7 || req.body.username > 20) {
      return next(
        errorHandler(401, "Username should contain characters b/w 7 abd 20")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(401, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(401, "Username should be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(401, " Username only contains letters and numbers")
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },

      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.user_id) {
    return errorHandler(401, "User cannot be deleted");
  }
  try {
        await User.findByIdAndDelete(req.params.user_id);
        res.status(200).json("User has been deleted")
  } catch (error) {
    next(error);
  }
};
