import express from "express";
import authMiddleware from "../middlewares/authentication.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrdersAdmin,
  orderStatus,
} from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.post("/placeorders", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrdersAdmin);
orderRouter.post("/status", orderStatus);

export default orderRouter;
