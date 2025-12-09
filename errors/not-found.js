const { StatusCodes } = require("http-status-codes");

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const NotFoundThrower = (itemName, item) => {
  if (!item) {
    throw new NotFound(`The ${itemName} is not found`);
  }
};

module.exports = { NotFound, NotFoundThrower };
