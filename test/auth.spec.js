const assert = require('assert').strict;
var app = require('../src/app.js'),
    request = require('supertest');

describe('Authenticate API', function () {
    it('Token:success', function (done) {
        request(app)
            .post('/api/authenticate')
            .send({ username: 'admin', password: 'admin' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {

                assert.equal(res.status, 200)
                assert.notEqual(res.body.token, null)
                assert.equal(res.body.message, "success")

                if (err) return done(err);

                done();
            })
    });

    it('authentication:validationerror', function (done) {
        request(app)
            .post('/api/authenticate')
            .send({ password: 'admin' })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {

                assert.equal(res.status, 400)
                assert.equal(res.body.token, undefined)
                assert.equal(res.body.message, "Validation Error")

                if (err) return done(err);

                done();
            })
    });
    it('Token:error', function (done) {
        request(app)
            .post('/api/authenticate')
            .send({ username: 'test', password: 'admin' })
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function (err, res) {

                assert.equal(res.status, 401)
                assert.equal(res.body.token, undefined)
                assert.equal(res.body.message, "Invalid username and password")

                if (err) return done(err);

                done();
            })
    });


})