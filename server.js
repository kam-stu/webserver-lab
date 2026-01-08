const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/login", require("./routes/login"));
app.use("/create", require("./routes/create"));
app.use("/post", require("./routes/post"));
app.use("/feed", require("./routes/feed"));
app.use("/media", express.static("/var/www/media"));

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

