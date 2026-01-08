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
app.use("/delete_user", require("./routes/deleteUser"));
app.use("/delete_post", require("./routes/deletePost"));
app.use("/search_users", require("./routes/searchUsers"));
app.use("/search_posts", require("./routes/searchPosts"));

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

