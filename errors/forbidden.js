const {StatusCodes} = require('http-status-codes');

class Forbidden extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = Forbidden