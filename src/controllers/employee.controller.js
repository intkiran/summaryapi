var EmployeeService = require('../services/employee.service')
const apiResponse = require("./apiResponse");
const db = require('../database.js');

class EmployeeController {

    constructor(service) {
        this.employeeService = service
    }

    addEmployee = async (req, res, next) => {

        try {
            const data = req.body;
            await this.employeeService.addEmployee(data);
            return apiResponse.successResponse(res, "New Employee is added");

        } catch (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                return apiResponse.checkDuplicateName(res, "Duplicate Employee with Name exists");
            }
            return apiResponse.ErrorResponse(res, "Internal Service Error while adding record");


        }

    }

    getEmployeeByName = async (req, res, next) => {
        const name = req.params.name

        try {
            const employees = await this.employeeService.getEmployeeByName(name);
            return apiResponse.successResponseWithData(res, "success", employees);
        } catch (error) {
            return apiResponse.ErrorResponse(res, "Internal Error retrieving record");
        }
    }

    deleteEmployeeById = async (req, res, next) => {

        const id = req.params.id
        try {
            await this.employeeService.deleteEmployeeById(id);
            return apiResponse.successResponse(res, "Deleted Employee");
        } catch (err) {
            return apiResponse.ErrorResponse(res, "Internal Error while Deleting");
        }

    }

    getAllEmployees = async (req, res, next) => {
        try {
            const employees = await this.employeeService.getAllEmployees();
            if (employees.length > 0) {
                return apiResponse.successResponseWithData(res, "Retrieved all Employees", employees);
            } else {
                return apiResponse.successResponseWithData(res, "Empty Records", []);
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, "Internal Server Error");
        }
    }

    getEmployeeSummary = async (req, res, next) => {

        try {
            const result = await this.employeeService.getEmployeeSummary();
            return apiResponse.successResponseWithData(res, "success", result);

        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }

    getEmployeeSummaryByContractId = async (req, res, next) => {
        try {
            const employees = await this.employeeService.getEmployeeSummaryByContractId();

            return apiResponse.successResponseWithData(res, "success", employees);

        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }

    getEmployeeSummaryByDept = async (req, res, next) => {
        try {
            const employees = await this.employeeService.getEmployeeSummaryByDept();
            return apiResponse.successResponseWithData(res, "success", employees);
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }

    getEmployeeSummaryByDeptAndSubDept = async (req, res, next) => {
        try {
            const employees = await this.employeeService.getEmployeeSummaryByDeptAndSubDept();
            return apiResponse.successResponseWithData(res, "success", employees);

        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }
}

module.exports = new EmployeeController(EmployeeService)

