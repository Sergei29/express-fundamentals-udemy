const express = require("express");
const fs = require("fs");

const PORT = 3000;
const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  const readable = fs.createReadStream(`${__dirname}/templates/node.html`);
  readable.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Express server at http://localhost:${PORT}`);
});
