const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

/**
 * Best to add helment before others,
 * to set the helmet's security features first.
 */
app.use(
  helmet({
    /**
     * @description we are only setting `reportOnly: true` here because, we are making fetch request from the inline script client-side, so we actually disabling one of the helmet features `contentSecurityPolicy`, which we shouldn't normally
     */
    contentSecurityPolicy: {
      reportOnly: true,
    },
  })
);

/**
 * Best practice in general would be to add at least these 3 built-in middlewares:
 * 1. express.static
 * 2. express.json
 * 3. express.urlencoded
 */
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/ajax", (req, res, next) => {
  console.log("req.body: ", req.body);

  if (
    typeof req.body !== "object" ||
    req.body === null ||
    Object.keys(req.body).length === 0 ||
    !req.body.data
  ) {
    res.statusMessage = "Wrong request body payload";
    res.status(400).json({ error: "Call failed. req.body.data missing." });
    return;
  }

  res.status(200).json(req.body);
});

app.get("/", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream(path.resolve(__dirname, "public", "ajax.html")).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
