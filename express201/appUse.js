const express = require("express");

const PORT = 3000;
const app = express();

const validateUser = (req, res, next) => {
  // get user info from cookies
  // query DB about user info
  // proceed to next
  const userId = req.params.id;
  if (typeof userId !== "string" || userId.length < 3) {
    app.locals = { error: "Not valid user ID." };
    res.redirect("/error/401");
    return;
  }

  res.locals.validated = true;
  res.locals.userInfo = { id: req.params.id, name: "John Doe" };

  next();
};

const logUser = (req, res, next) => {
  console.log("Log User middleware, IP: ", req.ip);
  console.log("Log User middleware, Url: ", req.url);
  console.log("Log User middleware User Info: ", res.locals.userInfo);

  next();
};

app.use("/user/:id", validateUser, logUser);

app.get("/", (req, res, next) => {
  console.log("Homepage, res.locals: ", res.locals);
  res.status(200).send(`<h1>This is homepage</h1>`);
});

app.get("/user/:id", (req, res, next) => {
  res.status(200).send(
    `<h1>This is user's page</h1>
      <p>Hello ${res.locals.userInfo?.name}!</p>
      <p>Your ID: "${res.locals.userInfo?.id}"</p>`
  );
});

app.get("/error/:statusCode", (req, res, next) => {
  const { statusCode = "500" } = req.params;
  res.status(+statusCode).send(
    `<h1>Sorry, there is an error</h1>
      <p> ${app.locals.error ?? ""}!</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
