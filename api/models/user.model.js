// import
import mongoose from "mongoose";

// Providing a set of rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// create a model

const User = mongoose.model("User", userSchema);

export default User;
