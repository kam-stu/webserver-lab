const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

/*
 * INSECURE FEED ROUTE
 * Vulnerabilities:
 *  - Stored XSS execution
 *  - No output encoding
 *  - No authentication
 *  - Information disclosure
 */

router.get("/", async (req, res) => {
  const query = `
    SELECT posts.id, posts.caption, posts.image_path, posts.created_at, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  try {
    const [rows] = await pool.query(query);

    let html = `
      <html>
        <head>
          <title>Feed</title>
        </head>
        <body>
          <h1>Message Feed</h1>
    `;

    // 🚨 Stored XSS happens here
    for (const row of rows) {
      html += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
          <strong>${row.username}</strong><br>
          <img src="/media/${row.image_path}" style="max-width:400px;"><br>
	  ${row.caption}
        </div>
      `;
    }

    html += `
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    // Intentionally leak DB errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

