const Joi = require('joi');

module.exports = {

    // POST /api/authenticate
    authenticate: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        },
    },


};