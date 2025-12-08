const BadRequest = require('./bad-request');
const CustomAPIError = require('./custom-error');
const Forbidden = require('./forbidden');
const {NotFound,NotFoundThrower} = require('./not-found');
const Unauthenticated = require('./unauthenticated');

module.exports = {
    CustomAPIError,
    BadRequest,
    Unauthenticated,
    NotFound,
    NotFoundThrower,
    Forbidden
}