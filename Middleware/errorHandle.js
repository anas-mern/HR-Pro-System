const { StatusCodes } = require("http-status-codes");

const errorHandle = (err, req, res, next) => {
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // 👈 هنا الأساس
  res.status(statusCode).json({ success: false, message });
};


module.exports = errorHandle;
