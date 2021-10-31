import express from "express";
const images = express.Router();

images.get("/", (req, res) => {
  //do something
  console.log('get proccessed image');
  
  res.send("connected");
});

export default images;
