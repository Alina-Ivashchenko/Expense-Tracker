const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_MYSQL_PASSWORD", /* ONLY THING YOU CHANGE */
  database: "expense_tracker"
});

module.exports = pool;

