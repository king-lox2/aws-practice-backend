import { connect } from "mongoose";

const connectDB = async (url) => {
  try {
    await connect(url);
    return console.log("Connected to the Database");
  } catch (err) {
    return console.log(err);
  }
};

export default connectDB;
