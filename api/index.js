//   import
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
// const express = require("express");

// inorder to use env file
dotenv.config()
// connect to the database
mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.log(err,"error on connecting");
  });

// server app create using express
const app = express();

// setup port number to the server app

app.listen(3000, () => {
  console.log("Server Running Successfully on port 3000!!");
});
