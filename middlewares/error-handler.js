import StatusCodes from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let customizeError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Something went wrong try again later`,
  };

  if (err.code === 11000) {
    customizeError.statusCode = 400;
    customizeError.msg = `Email already taken, try out another email.`;
  }

  if (err.name === "ValidationError") {
    customizeError.statusCode = 400;
    customizeError.msg = Object.values(err.errors)
      .map((items) => items.message)
      .join(",");
  }

  if (err.name === "CastError") {
    customizeError.statusCode = 404;
    customizeError.msg = `We can't find any food(s) with an id of ${err.value} `;
  }

  return res
    .status(customizeError.statusCode)
    .json({ msg: customizeError.msg });
};

export default errorHandler;
