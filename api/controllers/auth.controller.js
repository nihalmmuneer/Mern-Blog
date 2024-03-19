import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
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
    await newUser.save();
  } catch (err) {
    // res.status(500).json({
    //   message: err.message,
    // });
    next(err)
    
  }
};
