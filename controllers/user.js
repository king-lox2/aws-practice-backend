import userModel from "../models/userModel.js";
import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthorizedError from "../errors/unauthorized.js";

const register = async (req, res) => {
  const user = await userModel.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, token, user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ success: true, token, user: { name: user.name } });
};

export { register, login };
