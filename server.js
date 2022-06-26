const express = require('express');
const mysql = require('mysql2');
// const inquirer = require('inquirer');
const cTable = require('console.table');
const routes = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'employee_db'
//   }
// );

// app.get('/api/departments', (req, res) => {
//   console.info(`${req.method} request received for feedback`);
//   // Read the employee_db.employees table and display using the console.table package
//   // res = queries.showDepartments();
// });

// console.log("Showing department table")
// db.query('SELECT * FROM departments', function(err, results) {
//     console.log(results);
// });

// console.log("Showing roles");
// db.query('SELECT * FROM roles', function(err, results) {
//     console.log(results);
// });

// console.log("Showing employeess");
// db.query('SELECT * FROM employees', function(err, results) {
//     console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
