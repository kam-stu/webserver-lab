const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q } = req.query;

  // Default: return ALL users if no query
  const query = q
    ? `
      SELECT id AS user_id, username, password, role
      FROM users
      WHERE username LIKE '%${q}%'
    `
    : `
      SELECT id AS user_id, username, password, role
      FROM users
    `;

  try {
    const [rows] = await pool.query(query);

    res.json({
      count: rows.length,
      users: rows
    });

  } catch (err) {
    // Intentionally leak DB errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

