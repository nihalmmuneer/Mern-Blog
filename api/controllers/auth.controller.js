import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  console.log(req.body, "req-body");
  const { username, password, email } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    // return res.status(400).json({
    //   message: "All field must be filled",
    // });
    next(errorHandler(400, "All fields are required"));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hashPassword,
    email,
  });
  try {
    await newUser.save();
    res.json({
      message: " Registered Successfully",
    });
  } catch (err) {
    // res.status(500).json({
    //   message: err.message,
    // });
    next(err);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(404, "fill the required field"));
  }
  try {
    const validUser = await User.findOne({
      email,
    });
    if (!validUser) {
      return next(errorHandler(404, "User not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect Password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.SECRET_KEY
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, //inorder to secure the token
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};
export const google = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },  
        process.env.SECRET_KEY
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedpassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          username.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedpassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.SECRET_KEY
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
