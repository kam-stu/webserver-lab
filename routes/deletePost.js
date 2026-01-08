const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const fs = require("fs");
const path = require("path");

router.post("/", async (req, res) => {
  const { post_id } = req.body;

  if (!post_id) {
    return res.status(400).send("post_id required");
  }

  try {
    // 1️⃣ Fetch image path
    const [rows] = await pool.query(`
      SELECT image_path FROM posts
      WHERE id = ${post_id}
    `);

    if (rows.length === 0) {
      return res.status(404).send("Post not found");
    }

    const imagePath = rows[0].image_path;

    // 2️⃣ Delete post from DB
    await pool.query(`
      DELETE FROM posts
      WHERE id = ${post_id}
    `);

    // 3️⃣ Delete image file (best effort)
    const fullPath = path.join("/var/www/media", imagePath);
    try {
      fs.unlinkSync(fullPath);
    } catch (e) {
      // ignore missing files
    }

    res.json({
      success: true,
      deleted_post: post_id,
      deleted_image: imagePath
    });

  } catch (err) {
    // Intentionally leak DB / FS errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

