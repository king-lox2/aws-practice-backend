import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Item name"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    image: {
      type: String,
      required: [true, "Please provide Image"],
    },
    category: {
      type: String,
      required: [true, "Please provide Item Category"],
    },
  },
  { timestamps: true }
);

const storeModel =
  mongoose.models.Ecommerce_Delivery ||
  mongoose.model("Ecommerce_Delivery", storeSchema);

export default storeModel;
