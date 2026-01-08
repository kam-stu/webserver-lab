const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const query = `
    SELECT posts.id, posts.caption, posts.image_path, posts.created_at, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  try {
    const [rows] = await pool.query(query);

    // Return JSON instead of HTML
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feed", details: err.toString() });
  }
});

module.exports = router;

