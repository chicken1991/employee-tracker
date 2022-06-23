const express = require('express');
const mysql = require('mysql2');
// const inquirer = require('inquirer');
const cTable = require('console.table');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  }
);

//GET routes


//POST route(s)



console.log("Showing department table");
db.query('SELECT * FROM department', function(err, results) {
    console.log(results);
});

console.log("Showing roles");
db.query('SELECT * FROM roles', function(err, results) {
    console.log(results);
});

console.log("Showing employees");
db.query('SELECT * FROM employee', function(err, results) {
    console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
