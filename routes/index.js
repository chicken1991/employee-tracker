const router = require('express').Router();
const rolesRoutes = require('./api/roles');
const employeesRoutes = require('./api/employees');
const departmentsRoutes = require('./api/departments');

router.use('/roles', rolesRoutes);
router.use('/employees', employeesRoutes);
router.use('/departments', departmentsRoutes);

module.exports = router;