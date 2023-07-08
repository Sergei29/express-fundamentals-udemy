const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("<h1>All other routes</h1>");
});

module.exports = { router };
