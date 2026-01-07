const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/login", require("./routes/login"));

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

