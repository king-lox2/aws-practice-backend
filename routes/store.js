import express from "express";
import { addItems, listItems, deleteItems } from "../controllers/store.js";
import multer from "multer";

const storeRouter = express.Router();

// IMAGE DISKSTORAGE CREATION
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

storeRouter.post("/add", upload.single("image"), addItems);
storeRouter.get("/list", listItems);
storeRouter.post("/remove", deleteItems);

export default storeRouter;
