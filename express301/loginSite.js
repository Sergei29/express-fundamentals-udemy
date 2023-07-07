const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = 3000;
const app = express();

const checkQueryMessages = (req, res, next) => {
  if (req.query?.msg === "fail") {
    res.locals.message = "Login failed";
  }
  next();
};

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login", checkQueryMessages);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", (req, res, next) => {
  if (!!req.cookies?.username) {
    res.redirect("/welcome");
    return;
  }
  res.redirect("/login");
});

app.get("/login", (req, res, next) => {
  if (!!req.cookies?.username) {
    res.redirect("/welcome");
    return;
  }
  res.status(200).render("login");
});

app.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.get("/welcome", (req, res, next) => {
  if (!req.cookies?.username) {
    res.redirect("/login");
    return;
  }

  res
    .status(200)
    .render("welcome", { username: req.cookies?.username || "Username" });
});

app.get("/story/:storyId", (req, res, next) => {
  if (!req.cookies?.username) {
    res.redirect("/login");
    return;
  }

  res.render("story", { id: req.params.storyId, title: null });
});

app.get("/story/:storyId/:title", (req, res, next) => {
  if (!req.cookies?.username) {
    res.redirect("/login");
    return;
  }

  res.render("story", { id: req.params.storyId, title: req.params.title });
});

app.post("/process_login", (req, res, next) => {
  const { username, password } = req.body;
  // 1. check the db if credentials are valid
  // 2. if valid: save username in a cookie
  // 3. send to welcome page
  if (password === "secret123") {
    res.cookie("username", username, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });
    res.redirect("/welcome");
    return;
  }

  res.clearCookie("username");
  res.redirect("/login?msg=fail");
});

app.get("*", (req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
