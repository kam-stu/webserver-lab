const { Pool } = require("pg");

// Intentionally hardcoded credentials for lab
const pool = new Pool({
  user: "labuser",
  host: "localhost",
  database: "insecurelab",
  password: "labpass",
  port: 5432
});

// log when db is reachabe
pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error:", err);
});

module.exports = pool;

