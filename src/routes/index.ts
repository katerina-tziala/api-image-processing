import express from "express";
import images from "./api/images";

const routes = express.Router();

routes.get("/", (req, res) => {
  //do something
  res.send("connected");
});

routes.use("/images", images);

export default routes;
