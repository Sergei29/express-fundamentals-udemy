const express = require("express");
const path = require("path");
const fs = require("fs");

const adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
  res.status(200).send("<h1>Admin routes</h1>");
});

module.exports = { adminRouter };
