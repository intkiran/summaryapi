var express = require("express");
const validate = require("express-validation");
const AuthController = require("../controllers/auth.controller");
const {
    authenticate,

} = require('../validations/auth.validation');
var router = express.Router();

router.post("/", validate(authenticate), AuthController.authenticate);


module.exports = router;
