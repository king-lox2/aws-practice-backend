import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("token");

  if (!token)
    return res.status(401).send({ success: false, msg: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_CONFI);
    const { userID, name } = decoded;

    req.userid = userID;
    next();
  } catch (error) {
    throw new UnauthorizedError("Access Denied");
  }
};

export default authMiddleware;
