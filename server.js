const express = require('express');
const mysql = require('mysql2');
// const inquirer = require('inquirer');
const routes = require('./routes');
const inquirer = require('inquirer');
const axios = require('axios');


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
        //Call the route for showing departments table
        axios
          .get('http://localhost:3001/api/departments')
          .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
          })
          .catch(error => {
            console.error(error);
          });
          console.log("What would you like to do next?");
          promptInit();
        break;
      case "View all roles":
        axios
          .get('http://localhost:3001/api/roles')
          .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
          })
          .catch(error => {
            console.error(error);
          });
        break;
      case "View all employees":
        axios
          .get('http://localhost:3001/api/employees')
          .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
          })
          .catch(error => {
            console.error(error);
          });
        break;
      case "Add department":
        break;
      case "Add role":
        break;
      case "Add employee":
        break; 
      case "Update employee role":
        break;   
    }
})
  .catch((err) => console.error(err));
};



const init = () => {
promptInit();
}

init();