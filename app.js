const http = require("node:http");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

// localhost is not good if I want to dockerize, because
// it would only run in the docker container enviromnent
const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = 6543;
const dynamicData = {
  titleDoc: "Doc",
  titleWave: "Wave",
  inputTitle: "url / File selector",
  inputPlaceholder: "no url provided.",
  outputTitle: "Summary",
};

async function handleRequest(req, res) {
  try {
    if (req.method === "GET" && req.url === "/") {
      await serveHtml(req, res);
    } else if (req.method === "GET" && req.url.includes(".css")) {
      await serveCss(req, res);
    } else {
      await notFound(req, res);
    }
  } catch (err) {
    console.error(err);
  }
}

async function serveHtml(req, res) {
  const filePath = path.join(__dirname + "/index.html");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal server error.");
      return;
    }

    let modifiedData = data;
    for (const [key, value] of Object.entries(dynamicData)) {
      modifiedData = modifiedData.replace(`{{ ${key} }}`, value);
    }

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(modifiedData);
  });
}

async function serveCss(req, res) {
  const filePath = path.join(__dirname + req.url);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Internal server error.`);
    }

    res.writeHead(200, {
      "Content-Type": "text/css",
    });
    res.end(data);
  });
}

async function notFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at: http://${hostname}:${port}/`);
});
