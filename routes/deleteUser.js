const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const fs = require("fs");
const path = require("path");

router.post("/", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send("user_id required");
  }

  try {
    // 1️⃣ Get user's posts (for file deletion)
    const [posts] = await pool.query(`
      SELECT image_path FROM posts
      WHERE user_id = ${user_id}
    `);

    // 2️⃣ Delete posts from DB
    await pool.query(`
      DELETE FROM posts
      WHERE user_id = ${user_id}
    `);

    // 3️⃣ Delete user from DB
    await pool.query(`
      DELETE FROM users
      WHERE id = ${user_id}
    `);

    // 4️⃣ Delete media files (best-effort)
    posts.forEach(post => {
      const filePath = path.join("/var/www/media", post.image_path);
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        // Ignore missing files
      }
    });

    res.json({
      success: true,
      deleted_user: user_id,
      deleted_posts: posts.length
    });

  } catch (err) {
    // Intentionally leak errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

