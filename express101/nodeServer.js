const http = require("http");
const fs = require("fs/promises");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log("URL: ", req.url);
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  switch (req.url) {
    case "/":
      const html = await fs.readFile(`${__dirname}/node.html`, {
        encoding: "utf-8",
      });

      res.write(html);

      break;

    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.write("<h1>Page not found!");
      res.end();
      return;
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
