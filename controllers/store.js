import storeModel from "../models/storeModel.js";
import StatusCodes from "http-status-codes";
import fs from "fs";

const addItems = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const store = new storeModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await store.save();
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "Item Added" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error });
  }
};

const listItems = async (req, res) => {
  try {
    const store = await storeModel.find({});
    res.status(StatusCodes.OK).json({ success: true, data: store });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error });
  }
};

const deleteItems = async (req, res) => {
  try {
    const store = await storeModel.findById(req.body._id);
    fs.unlink(`uploads/${store.image}`, () => {});
    await storeModel.findByIdAndDelete(req.body._id);
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Item has been deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error });
  }
};

export { addItems, listItems, deleteItems };
