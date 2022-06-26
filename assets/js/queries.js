const mysql = require('mysql2');
const db = require('../../config/connection');

class Queries {
    constructor(table) {
        table = this.table;
    }

    showDepartments() {
        console.log("Showing department table")
        db.promise().query('SELECT * FROM departments', function (err, results) {
            console.log(results);
        });
    }
    showRoles() {
        console.log("Showing roles table")
        db.query('SELECT * FROM roles', function (err, results) {
            console.log(results);
        });
    }

    showEmployees() {
        console.log("Showing employees table")
        db.query('SELECT * FROM employees', function (err, results) {
            console.log(results);
        });
    }

    createDepartment(name) {
        console.log("Creating new Department")
            db.query(`INSERT INTO departments VALUE ${name}`, function (err, results) {
                console.log(results + "what is undefined?");
            });
    }
}

//Show departments
// Queries.showDepartments() {
//     return `SELECT * FROM departments`
// }



//create departments

function createDepartment(name) {
    console.log("Showing employees table")
        db.query('SELECT * FROM employees', function (err, results) {
            console.log(results);
        });
}

//create roles

//create employees

//modify departments

//modify roles

//modify employees

//module.exports = { class1, class2 }

//Exports

module.exports = Queries;