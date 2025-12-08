const {StatusCodes} = require('http-status-codes');

class UnAuthenticated extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticated