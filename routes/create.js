const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.post("/", async (req, res) => {
  const { username, password, role } = req.body;

  const query = `
    INSERT INTO users (username, password, role)
    VALUES ('${username}', '${password}', '${role || "user"}')
    RETURNING *
  `;

  try {
    const result = await pool.query(query);

    res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (err) {
    // Intentionally leak DB errors
    res.status(500).send(err.toString());
  }
});

module.exports = router;

