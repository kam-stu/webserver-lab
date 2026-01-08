const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const query = `
    SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'
  `;

  try {
    const [rows] = await pool.query(query);

    if (rows.length > 0) {
      res.json({
        success: true,
        user: rows[0]
      });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    // Leak DB errors on purpose
    res.status(500).send(err.toString());
  }
});

module.exports = router;

