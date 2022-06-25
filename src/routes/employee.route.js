var express = require("express");
const validate = require('express-validation');

const EmployeeController = require("../controllers/employee.controller");
const { verifyUserToken, IsAdmin, IsUser } = require("../middlewares/auth");
const {
    addEmployee,
    getEmployeeByname,
    deleteEmployee
} = require('../validations/employee.validation');
var router = express.Router();

// public access 
router.get("/", EmployeeController.getAllEmployees);

// Authenticated  and authorized with Role.User only
router.get("/summary", verifyUserToken, IsUser, EmployeeController.getEmployeeSummary);
router.get("/summaryByContract", verifyUserToken, IsUser, EmployeeController.getEmployeeSummaryByContractId);
router.get("/summaryByDept", verifyUserToken, IsUser, EmployeeController.getEmployeeSummaryByDept);
router.get("/summaryByDeptAndSub", verifyUserToken, IsUser, EmployeeController.getEmployeeSummaryByDeptAndSubDept);
router.get("/:name", verifyUserToken, IsAdmin, validate(getEmployeeByname), EmployeeController.getEmployeeByName);

// Authenticated  and authorized with Role.Admin and Role.User
router.post("/", verifyUserToken, IsAdmin, validate(addEmployee), EmployeeController.addEmployee);
router.delete("/:id", verifyUserToken, IsAdmin, validate(deleteEmployee), EmployeeController.deleteEmployeeById);

module.exports = router;
