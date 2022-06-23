const express = require('express');

const employeesRouter = require('./employees');
const rolesRouter = require('./roles');
const departmentsRouter = require('./departments');


const app = express();

app.use('/employees', employeesRouter);
app.use('/roles', rolesRouter);
app.use('/depaprtments', departmentsRouter);

module.exports = app;
