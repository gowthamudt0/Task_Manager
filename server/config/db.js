const mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "task_manager",
});

con.connect((err) => {
  if (err) throw err;
  console.log("database is connected");
});

module.exports = con;
