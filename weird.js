const express = require("express");
const app = express();
const expressip = require("express-ip");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(expressip().getIpInfoMiddleware);

app.set("PORT", PORT);

app.get("/", function (req, res) {
  var ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  res.send(ip);
});

app.listen(app.get("PORT"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("PORT") +
      "; press Ctrl-C to terminate."
  );
});
