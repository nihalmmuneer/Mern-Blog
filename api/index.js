//   import
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import path from "path";
// const express = require("express");

// inorder to use env file
dotenv.config();
// connect to the database
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Mongoose connected successfully");
  }, 6000)
  .catch((err) => {
    console.log(err, "error on connecting");
  });

const __dirname = path.resolve(); //To get the directory of the project located anywhere

// server app create using express
const app = express();

// To send json to backend
app.use(express.json());

// Inorder to use cookieParser --> used to get the cookie stored data
app.use(cookieParser());

// test apis
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Api working!!!",
//   });
// });
app.use("/api/user", userRouter);

app.use("/api/auth", signRouter);

app.use("/api/post", postRouter);

app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// middleware to handle errors

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// setup port number to the server app
app.listen(3000, () => {
  console.log("Server Running Successfully on port 3000!!");
});
