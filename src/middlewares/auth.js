const config = require('../data/config.json');
const apiResponse = require("../controllers/apiResponse");
const jwt = require('jsonwebtoken');
class AuthMiddleware {

    verifyUserToken = (req, res, next) => {
        let token = req.headers.authorization;
        if (!token)
            return apiResponse.unauthorizedResponse(res, "Access Denied / Unauthorized request");

        try {
            token = token.split(' ')[1] // Remove Bearer from string

            if (token === 'null' || !token)
                return apiResponse.unauthorizedResponse(res, "Unauthorized request test");


            let verifiedUser = jwt.verify(token, config.SECRET_KEY);   // config.TOKEN_SECRET => 'secretKey'
            if (!verifiedUser)
                return apiResponse.unauthorizedResponse(res, "Unauthorized request");
            req.user = verifiedUser;
            next();

        } catch (error) {
            return apiResponse.unauthorizedResponse(res, "Invalid Token");
        }

    }
    IsUser = async (req, res, next) => {
        // authorize based on user role - user

        if (!"User".includes(req.user.role)) {
            // user's role is not authorized
            return apiResponse.unauthorizedForbiddenResponse(res, "User Role is not authorized");
        }
        // authentication and authorization successful
        next();


    }
    IsAdmin = async (req, res, next) => {

        // authorize based on user role i.e admin or user
        if ((!"Admin".includes(req.user.role))) {
            // user's role is not authorized
            return apiResponse.unauthorizedForbiddenResponse(res, "User Role is not authorized");
        }
        // authentication and authorization successful
        next();
    }
}
module.exports = new AuthMiddleware()

