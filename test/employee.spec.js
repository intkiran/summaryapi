const assert = require('assert').strict;
const { step } = require('mocha-steps');
var app = require('../src/app.js'),
    request = require('supertest');
describe('EmployeeAPI:ADD:GET:DELETE:ALL', function () {
    let token = null;
    let id = null;

    before("Authenticate", (done) => {
        request(app)
            .post('/api/authenticate')
            .send({ username: 'admin', password: 'admin' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {

                token = res.body.data.token;

                done();
            });
    });
    step('addEmployee:error', ((done) => {
        request(app)
            .post('/api/employees')
            .send({
                "salary": "300", "currency": "USD", "department": "Administration",
                "sub_department": "Agriculture"
            })
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                assert.equal(res.status, 400)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "Validation Error")
                if (err) return done(err);
                done();
            })
    }));
    step('addEmployee:success', ((done) => {
        request(app)
            .post('/api/employees')
            .send({
                name: "testuser", "salary": "300", "currency": "USD", "department": "Administration",
                "sub_department": "Agriculture"
            })
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {

                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "New Employee is added")
                if (err) return done(err);
                done();
            })
    }));

    step('getEmployee:success ', ((done) => {

        request(app)
            .get('/api/employees/testuser')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                id = res.body.data.id;

                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "success")
                if (err) return done(err);
                done();
            })
    }));
    step('deleteEmployees:success', ((done) => {

        request(app)
            .delete('/api/employees/' + id)
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {

                assert.equal(res.status, 200)
                assert.equal(res.body.message, "Deleted Employee")
                if (err) return done(err);


                done();
            })
    }));
    it('allEmployees', ((done) => {
        request(app)
            .get('/api/employees')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "Retrieved all Employees")
                if (err) return done(err);
                done();
            })
    }));

})
describe('EmployeeAPI:Others', function () {
    let token = null;
    let id = null;

    before("Authenticate", (done) => {
        request(app)
            .post('/api/authenticate')
            .send({ username: 'user', password: 'user' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                token = res.body.data.token;
                done();
            });
    });
    step('getEmployeeSummary:success', ((done) => {
        request(app)
            .get('/api/employees/summary')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "success")
                assert.notEqual(res.body.data.mean, null)
                assert.notEqual(res.body.data.max, null)
                assert.notEqual(res.body.data.min, null)
                if (err) return done(err);
                done();
            })
    }));
    step('getEmployeeSummaryByContract:success', ((done) => {
        request(app)
            .get('/api/employees/summaryByContract')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "success")
                assert.notEqual(res.body.data.mean, null)
                assert.notEqual(res.body.data.max, null)
                assert.notEqual(res.body.data.min, null)
                if (err) return done(err);
                done();
            })
    }));
    step('getEmployeeSummaryByDept:success', ((done) => {
        request(app)
            .get('/api/employees/summaryByDept')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "success")
                assert.notEqual(res.body.data.length, 0)

                if (err) return done(err);
                done();
            })
    }));
    step('getEmployeeSummaryByDeptAndSubdept:success', ((done) => {
        request(app)
            .get('/api/employees/summaryByDeptAndSub')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.notEqual(res.body, null)
                assert.equal(res.body.message, "success")
                assert.notEqual(res.body.data.length, 0)

                if (err) return done(err);
                done();
            })
    }));

})