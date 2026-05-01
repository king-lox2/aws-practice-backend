import CustomAPIError from "./custom-errors.js";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default UnauthorizedError;
