const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.post("/", async (req, res) => {
  const { user_id, content } = req.body;

  const query = `
    INSERT INTO posts (user_id, message)
    VALUES (${user_id}, '${content}')
    RETURNING *
  `;

  try {
    const result = await pool.query(query);

    res.json({
      success: true,
      post: result.rows[0]
    });
  } catch (err) {
    // Intentionally leak DB errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

