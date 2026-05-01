import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide userId"],
  },
  items: {
    type: Array,
    required: [true, "Please provide items"],
  },
  amount: {
    type: String,
    required: [true, "Please enter amount"],
  },
  address: {
    type: Object,
    required: [true, "Please provide address"],
  },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
