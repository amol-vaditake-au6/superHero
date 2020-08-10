const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const publicPath = path.join(__dirname, "..", "frontend/build");
const port = process.env.PORT || 1234;
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(require("./sollution"));

app.get("/", function (req, res) {
  return res.send("Your are connected to server successfully");
});

app.listen(1234, function () {
  console.log("Server started");
});
