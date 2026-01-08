const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const upload = require("./upload");
const sharp = require("sharp");
const fs = require("fs");

router.post("/", upload.single("image"), async (req, res) => {
  const { user_id, content } = req.body;

  if (!req.file) {
    return res.status(400).send("Image required");
  }

  // Predictable filename (intentional)
  const filename = Date.now() + ".jpg";
  const finalPath = `/var/www/media/posts/${filename}`;

  try {
    // Instagram-style processing
    await sharp(req.file.path)
      .rotate() // handle phone EXIF orientation
      .resize(1080, 1080, {
        fit: "cover",
        position: "centre"
      })
      .jpeg({ quality: 85 })
      .toFile(finalPath);

    // Delete temp file
    fs.unlinkSync(req.file.path);

    // INTENTIONALLY SQL-INJECTABLE
    const query = `
      INSERT INTO posts (user_id, caption, image_path)
      VALUES (${user_id}, '${content}', 'posts/${filename}')
    `;

    await pool.query(query);

    res.json({
      success: true,
      image: `posts/${filename}`
    });

  } catch (err) {
    // Intentionally leak errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

