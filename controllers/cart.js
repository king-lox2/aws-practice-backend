import userModel from "../models/userModel.js";
import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthorizedError from "../errors/unauthorized.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById({ _id: req.userid });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.userid, { cartData });
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "Added To Cart" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Failed Added To Cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById({ _id: req.userid });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userid, { cartData });
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Failed to delete" });
  }
};

const fetchCartData = async (req, res) => {
  try {
    let userData = await userModel.findById({ _id: req.userid });
    let cartData = await userData.cartData;
    res.status(StatusCodes.OK).json({ success: true, cartData });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Failed To Fetch Cart Data" });
  }
};

export { addToCart, removeFromCart, fetchCartData };
