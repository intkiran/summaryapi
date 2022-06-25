

class ApiResponse {

    successResponse = function (res, msg) {
        var data = {
            status: "success",
            message: msg
        };
        return res.status(200).json(data);
    };

    successResponseWithData = function (res, msg, data) {
        var resData = {
            status: "success",
            message: msg,
            data: data
        };
        return res.status(200).json(resData);
    };

    ErrorResponse = function (res, msg) {
        var data = {
            status: "error",
            message: msg,
        };
        return res.status(500).json(data);
    };

    notFoundResponse = function (res, msg) {
        var data = {
            status: "error",
            message: msg,
        };
        return res.status(404).json(data);
    };

    validationErrorWithData = function (res, msg, data) {
        var resData = {
            status: "error",
            message: msg,
            data: data
        };
        return res.status(400).json(resData);
    };

    unauthorizedResponse = function (res, msg) {
        var data = {
            status: "error",
            message: msg,
        };
        return res.status(401).json(data);
    };

    unauthorizedForbiddenResponse = function (res, msg) {
        var data = {
            status: "error",
            message: msg,
        };
        return res.status(403).json(data);
    };
    checkDuplicateName = function (res, msg) {
        var data = {
            status: "error",
            message: msg,
        };
        return res.status(409).json(data);
    };
}

module.exports = new ApiResponse()
