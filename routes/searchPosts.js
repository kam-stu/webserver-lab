const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q } = req.query;

  const query = q
    ? `
      SELECT
        posts.id AS post_id,
        posts.user_id,
        users.username,
        posts.caption,
        posts.image_path,
        posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.caption LIKE '%${q}%'
      ORDER BY posts.created_at DESC
    `
    : `
      SELECT
        posts.id AS post_id,
        posts.user_id,
        users.username,
        posts.caption,
        posts.image_path,
        posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `;

  try {
    const [rows] = await pool.query(query);

    res.json({
      count: rows.length,
      posts: rows
    });

  } catch (err) {
    // Intentionally leak DB errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

