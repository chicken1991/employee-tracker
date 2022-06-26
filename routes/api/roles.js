const router = require('express').Router();
const fs = require('fs');
const queries = require('../../assets/js/queries');


const newQ = new queries();

router.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
    // Read the employee_db.employees table and display using the console.table package
    newQ.showRoles();

  });

  router.post('/', (req, res) => { // <======= Route should be /api or something?
    // Log that a POST request was received
    console.info(`${req.method} request received to submit feedback`);

    // Utilize queries to insert into table 
  });

module.exports = router;