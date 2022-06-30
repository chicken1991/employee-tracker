const express = require('express');
const mysql = require('mysql2/promise');
const routes = require('./routes');
const inquirer = require('inquirer');
const db = require('./config/connection');
const QUERIES = require('./assets/js/queries');


//Helper file Requests
const Requests = require('./assets/js/requests');
const { request } = require('express');
const requests = new Requests();

//Server port
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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
      case "View all departments": //done
        //Call the route for showing departments table
       requests.getRequest("departments");
        break;
      case "View all roles": // done
        requests.getRequest("roles");
        break;
      case "View all employees": //done 
        requests.getRequest("employees");
        break;
      case "Add department":  //done
        promptNewDep()
        break;
      case "Add role": 
        // requests.postRequest("roles");
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

  const promptNewRole = () => {
    const depts = () => { return new Map(requests.getRequest("departments")); } //this doesn't work, dog.
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
        choices: depts()
      }
    ])
      .then((val) => {
        requests.postRequest("departments", val.name, null)
      })
      .catch((err) => console.error(err));
    };

const init = () => {
promptInit();
}

// promptNewRole();

init();