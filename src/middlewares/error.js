const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('./api-error');
class ErrorMiddleware {

    /**
     * Error handler. Send stacktrace only during development
     * @public
     */
    handler = (err, req, res, next) => {

        const response = {
            code: err.status,
            message: err.message || httpStatus[err.status],
            errors: err.errors,
            stack: err.stack,
        };


        res.status(err.status);
        res.json(response);
    };


    /**
     * If error is not an instanceOf APIError, convert it.
     * @public
     */
    converter = (err, req, res, next) => {
        let convertedError = err;

        if (err instanceof expressValidation.ValidationError) {
            convertedError = new APIError({
                message: 'Validation Error',
                errors: err.errors,
                status: err.status,
                stack: err.stack,
            });
        } else if (!(err instanceof APIError)) {
            convertedError = new APIError({
                message: err.message,
                status: err.status,
                stack: err.stack,
            });
        }

        return this.handler(convertedError, req, res);
    };

    /**
     * Catch 404 and forward to error handler
     * @public
     */
    notFound = (req, res, next) => {
        const err = new APIError({
            message: 'Not found',
            status: httpStatus.NOT_FOUND,
        });
        return this.handler(err, req, res);
    };
}
module.exports = new ErrorMiddleware()
