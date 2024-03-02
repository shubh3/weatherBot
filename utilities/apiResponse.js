const httpStatusCodes = require('http-status-codes');

module.exports = class ApiResponse {
    static success = ( res, status = 200, message, result
    ) => {
        res.status(status);

        res.json({
            status,
            message: message || "SUCCESS",
            result
        });
    };

    static error = (
        res, status = 400, error,
    ) => {
        res.status(status).json({
            status,
            message: error ||  httpStatusCodes.getStatusText(status),
            result:null
        });
    };

}
