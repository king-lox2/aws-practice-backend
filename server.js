import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Configure dotenv
dotenv.config();

import "express-async-errors";

const app = express();
const port = process.env.PORT;


// db import
import connectDB from "./connectdb/connectdb.js";

// router import
import storeRouter from "./routes/store.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

// middelware
import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World, from Kingzy');
})

// api endpoints
app.use("/api/store", storeRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// keep below api endpoints always
app.use(notFound);
app.use(errorHandler);



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const port = process.env.PORT || 4000;

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server Started on port ${port}`);
    });

  } catch (error) {
    console.log(error);
  }
};

start();

