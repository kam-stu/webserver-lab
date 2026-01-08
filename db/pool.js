const mysql = require("mysql2");

// Create a MySQL pool (similar to pg Pool)
const pool = mysql.createPool({
  host: "172.26.0.11",    // or the path to your MySQL server
  user: "umagram",
  password: "condorpasa<3",         // put your MySQL password here
  database: "umagram_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: use promise wrapper for async/await
const promisePool = pool.promise();

// Test connection
promisePool.getConnection()
  .then(conn => {
    console.log("Connected to MySQL");
    conn.release();
  })
  .catch(err => {
    console.error("MySQL connection error:", err);
  });

module.exports = promisePool; // export the promise pool for queries

