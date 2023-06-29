const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, "templates", "node.html"));
});

app.post("/", (req, res, next) => {
  res.status(200).send("<h1>This is homepage</h1><p>This is POST request</p>");
});

app.delete("/", (req, res, next) => {
  res
    .status(200)
    .send("<h1>This is homepage</h1><p>This is DELETE request</p>");
});

app.put("/", (req, res, next) => {
  res.status(200).send("<h1>This is homepage</h1><p>This is PUT request</p>");
});

app.all("*", (req, res, next) => {
  const readable = fs.createReadStream(
    path.resolve(__dirname, "templates", "404.html")
  );
  res.status(404);
  readable.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
