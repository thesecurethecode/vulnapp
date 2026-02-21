const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root", // empty password
  database: "vulnapp",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed", err);
    return;
  }
  console.log("Connected to MYSQL");
});

//VULNERABLE LOGIN ROUTE
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE username=? AND paswword=?"

  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.send("Database error");
    }

    if (results.length > 0) {
      res.send("Login Successful");

    } else {
      res.send("Invalid Credentials");
    }
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
