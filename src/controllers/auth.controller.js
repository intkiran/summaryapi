var AuthService = require('../services/auth.service')
const apiResponse = require("./apiResponse");

class AuthController {
    constructor(service) {
        this.authService = service
    }

    authenticate = async (req, res, next) => {
        const data = req.body;

        try {
            const result = await this.authService.authenticate(data);

            if (result !== undefined)
                return apiResponse.successResponseWithData(res, "success", result);
            else {
                return apiResponse.unauthorizedResponse(res, "Invalid username and password");
            }

        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }

}
module.exports = new AuthController(AuthService)
