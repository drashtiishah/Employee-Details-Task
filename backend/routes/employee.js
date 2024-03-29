const router = require('express').Router();
const { isCached, handleGetAllEmployee, handleCreateNewEmployee } = require('../controller/employee')

router.route("/")
    .get(isCached ,handleGetAllEmployee)
    .post(handleCreateNewEmployee);

module.exports = router;