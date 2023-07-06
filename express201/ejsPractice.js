const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const validateUser = (req, res, next) => {
  res.locals = {
    valid: true,
    navLinks: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Gallery", href: "/gallery" },
    ],
    data: ["John", "Jenna", "Sally", "Hayley", "Brandon"],
    url: req.url.includes(".") ? null : req.url,
  };
  next();
};
app.use(["/", "/about", "/services", "/gallery"], validateUser);

app.get("/about", (req, res, next) => {
  /**
   * @description `res.locals` object will be merged into
   * the data in the .render("name", payload): second arg
   */
  res.status(200).render("about");
});

app.get("/services", (req, res, next) => {
  /**
   * @description `res.locals` object will be merged into
   * the data in the .render("name", payload): second arg
   */
  res.status(200).render("services");
});

app.get("/gallery", (req, res, next) => {
  /**
   * @description `res.locals` object will be merged into
   * the data in the .render("name", payload): second arg
   */
  res.status(200).render("gallery");
});

app.get("/", (req, res, next) => {
  /**
   * @description `res.locals` object will be merged into
   * the data in the .render("name", payload): second arg
   */
  res.status(200).render("index");
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
