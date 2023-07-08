const express = require("express");
const path = require("path");
const fs = require("fs");

const userRouter = express.Router();

const validateUser = (req, res, next) => {
  res.locals.user = "John Doe";
  next();
};

userRouter.use(validateUser);

userRouter.get("/", (req, res, next) => {
  res
    .status(200)
    .send(`<h1>User routes</h1><p>User name: ${res.locals.user}</p>`);
});

module.exports = { userRouter };
