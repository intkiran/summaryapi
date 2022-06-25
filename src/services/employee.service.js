const db = require('../database.js');
class EmployeeService {
    constructor(db) {
        this.db = db
    }

    addEmployee = (data) => {
        const query = `INSERT INTO employees (name, salary,currency, department, sub_department, on_contract) VALUES (?,?,?,?,?,?);`;
        const params = [
            data.name,
            data.salary,
            data.currency,
            data.department,
            data.sub_department,
            (data.on_contract) ? 1 : 0,

        ];

        return new Promise((resolve, reject) => {
            db.all(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true)
                }
            });
        });
    }
    getEmployeeByName = (name) => {
        const query = `SELECT id,name, salary,currency, department, 
        sub_department ,
        CASE on_contract
        WHEN '1' THEN 'true' 
        ELSE 'false' 
        END on_contract FROM employees where name=?`;

        return new Promise((resolve, reject) => {
            db.all(query, name, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0])
                }
            });
        });
    }


    deleteEmployeeById = (id) => {
        const query = `DELETE FROM employees WHERE id = ?;`;
        return new Promise((resolve, reject) => {
            db.run(query, id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }
            });
        });
    }

    getAllEmployees = (id) => {
        const query = `SELECT id,name, salary,currency, department, sub_department,
                       CASE on_contract
                       WHEN '1' THEN 'true' 
                       ELSE 'false' 
                       END on_contract FROM employees;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results)
                }
            });
        });

    }

    getEmployeeSummary = () => {
        const query = `SELECT sum(salary) as sum,avg(salary) as mean,
                       max(salary) as max,min(salary) as min  
                       FROM employees;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0])
                }
            });
        });

    }

    getEmployeeSummaryByContractId = () => {
        const query = `SELECT sum(salary) as sum,avg(salary) as mean,max(salary) as max,min(salary) as min  FROM employees where on_contract=1;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0])
                }

            });
        });


    }

    getEmployeeSummaryByDept = () => {
        const query = `SELECT department, sum(salary) as sum,avg(salary) as mean,max(salary) as max,min(salary) as min  FROM employees group by department;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results)
                }

            });
        });
    }

    getEmployeeSummaryByDeptAndSubDept = () => {
        const query = `SELECT department,sub_department,count(*),sum(salary) as sum,avg(salary) as mean,max(salary) as max,min(salary) as min  FROM employees group by department,sub_department;`;

        return new Promise((resolve, reject) => {
            db.all(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results)
                }

            });
        });
    }
}
module.exports = new EmployeeService(db)
