import express from "express";
import {
  addToCart,
  removeFromCart,
  fetchCartData,
} from "../controllers/cart.js";
import authHandler from "../middlewares/authentication.js";

const cartRouter = express.Router();

cartRouter.post("/add", authHandler, addToCart);
cartRouter.post("/remove", authHandler, removeFromCart);
cartRouter.post("/cartdata", authHandler, fetchCartData);

export default cartRouter;
