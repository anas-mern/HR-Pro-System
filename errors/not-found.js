const { StatusCodes } = require("http-status-codes");

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const NotFoundThrower = (itemName,item) => {
  if (!item) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `${itemName} not found` });
  }
};

module.exports = {NotFound,NotFoundThrower};
