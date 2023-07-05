const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * https://expressjs.com/en/4x/api.html#app.set
 * Setting the view templating engine
 */
app.set("view engine", "ejs");

/**
 * to use the res.render() method:
 * 1. Express starts running
 * 2. we should define the template engine:
 * - EJS
 * - Mustache
 * - Handlebars
 * - Pug etc.
 * 3. inside one of our routes we have res.render()
 * 4. We pass this res.render() method - 2 arguments: 1)template file we want to use, and 2) the data we want to send to that file
 * 5. Express uses node module for our specified view engine and parses the file
 */
app.get("/", (req, res, next) => {
  res.status(200).render(path.resolve(__dirname, "views", "hello.ejs"));
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
