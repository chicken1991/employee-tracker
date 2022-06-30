const mysql = require('mysql2');
const db = require('../../config/connection');

class Queries {
    constructor(table) {
        table = this.table;
    }

    showDepartments() {
        console.log("Showing department table")
        db.promise().query('SELECT department_name FROM departments')
        .then( ([rows,fields]) => {
            console.table(rows);
          })
        //   .catch(console.log)
          .then( () => db.end());
    }

    showRoles() {
        console.log("Showing roles table")
        db.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
        });
    }

    showEmployees() {
        console.log("Showing employees table")
        db.query('SELECT * FROM employees', function (err, results) {
            console.table(results);
        });
    }

    createDepartment(name) {
        console.log(`Creating new Department`)
            db.query(`INSERT INTO departments (department_name) VALUES ('${name}')`, function (err, results) {
                console.log(`${name} added to Departments`);
            });
    }

    createRole(name, title, salary, dep_id) {
        console.log(`Creating new Role`)
            db.query(`INSERT INTO roles (title,salary,department_id) VALUEs(${title},${salary},${dep_id})`, function (err, results) {
                console.log(`${name} added to Roles`);
            });
    }

    createEmployee(firstName, lastName, role_id, manager_id) {
        console.log(`Creating new Role`)
            db.query(`INSERT INTO roles (first_name,last_name,role_id,manager_id) VALUEs(${firstName},${lastName},${role_id},${manager_id})`, function (err, results) {
                console.log(`${name} added to Roles`);
            });
        }

        // modifyEmployee()  ==== DO THIS (eventually)
}

module.exports = Queries;