const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'

  }
);

//Inquirer stuff!!

//PromptInit gives you the "main menu" to the app. This utilizes Requests 
// file that calls upon axios to do the requests to the server
const promptInit = () => {
  inquirer
  .prompt
  ([{
      type: 'list',
      name: 'answer',
      message: "Select what you would like to do",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role"
      ]
}])
  .then((data) => {
    switch(data.answer) {
      case "View all departments":
        showDepartments();
        break;
      case "View all roles": // done?
        showRoles();
        break;
      case "View all employees": //done ?
        showEmployees();
        break;
      case "Add department":  //done?
        promptNewDep();
        break;
      case "Add role": 
        promptNewRole();
        break;
      case "Add employee":
        requests.postRequest("employees");
        break; 
      case "Update employee role":
        updateEmployee();
        break;   
    }
})
  .catch((err) => console.error(err));
};

const promptNewDep = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "Input the new department name",
    }
  ])
    .then((val) => {
      requests.postRequest("departments", val.name, null)
    })
    .catch((err) => console.error(err));
  };

  // ===========================================================================================================================
  const promptNewRole = () => {

    inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Input the new Role title",
      },
      {
        type: 'input',
        name: 'salary',
        message: "Input the new Role salary",
      },
      {
        type: 'list',
        name: 'dept',
        message: "Select which department this role is part of",
        choices: deptArray
      }
    ])
      .then((val) => {
        console.log(val.dept);
        // createRole(val.title, val.salary, val.dept.id)
      })
      .catch((err) => console.error(err));
    };

function promptContinue() {
  inquirer.prompt(
    {
      type: 'list',
      name: 'answer',
      message: "Continue?",
      choices: ["yes", "no"]
    }
  )
  .then(val => {
    if(val.answer === "yes"){
      promptInit();
    } else {
      db.end();
    }
  });
}

const init = () => {
promptInit();
}

// Queries

function showDepartments() {
  console.log("Showing department table")
  db.promise().query('SELECT department_name FROM departments')
    .then( ([rows,fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    // .then( () => db.end())
    .then(promptContinue());
}

function returnDepartments() {
  var choices;
  db.promise().query('SELECT * FROM departments')
    .then( ([rows,fields]) => {
      return fields;
    })
    .catch(console.log)
    .then(promptInit());
}

function showRoles() {
  console.log("Showing roles table")
  db.promise().query('SELECT * FROM roles')
    .then( ([rows,fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(promptInit());
}

function returnRoles() {
  console.log("Showing roles table")
  db.promise().query('SELECT * FROM roles')
    .then( ([rows,fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(promptInit());
}

function showEmployees() {
  console.log("Showing employees table")
  db.promise().query('SELECT * FROM employees')
    .then( ([rows,fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(promptInit());
}

function createDepartment(name) {
  console.log(`Creating new Department`)
      db.query(`INSERT INTO departments (department_name) VALUES ('${name}')`, function (err, results) {
          console.log(`${name} added to Departments`);
      });
}

function createRole(title, salary, dep_id) {
  console.log(`Creating new Role`)
      db.query(`INSERT INTO roles (title,salary,department_id) VALUEs(${title},${salary},${dep_id})`, function (err, results) {
          // console.log(`${title} added to Roles`);
          showRoles();
      })
}

function createEmployee(firstName, lastName, role_id, manager_id) {
  console.log(`Creating new Role`)
      db.query(`INSERT INTO roles (first_name,last_name,role_id,manager_id) VALUEs(${firstName},${lastName},${role_id},${manager_id})`, function (err, results) {
          console.log(`${name} added to Roles`);
      });
  }



  function deptArray() {
    return new Promise(
      (resolve, reject) => {
        db.query("SELECT * FROM departments", (err, rows) => {
          if (err) {
            reject(err);
          }
          // resolve(rows.map(row => row.department_name));
          resolve(rows.map(({id, department_name}) => ({id: id, name: department_name})));
        })
      }
    );
  }

  // deptArray().then(myArray => {
  //   console.log(myArray);
  // });

  init();