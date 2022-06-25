const Joi = require('joi');

module.exports = {
    // POST /api/employees
    addEmployee: {
        body: {
            name: Joi.string().required(),
            salary: Joi.number().required(),
            department: Joi.string().required(),
            sub_department: Joi.string().required(),
        },
    },
    // PATCH /api/employee/:id
    deleteEmployee: {
        params: {
            id: Joi.number().required(),
        },
    },
    // PATCH /api/employee/:name
    getEmployeeByname: {
        body: {

        },
        params: {
            name: Joi.string().required(),
        },
    },
};