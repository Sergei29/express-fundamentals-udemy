const express = require("express");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const { router } = require("./router/router");
const { adminRouter } = require("./router/adminRouter");
const { userRouter } = require("./router/userRouter");

const PORT = 3000;
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
