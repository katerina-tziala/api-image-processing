import express from "express";
import * as fs from "fs";
import { getThumbPath, getImageOptionsFromQuery } from "../../modules/images/images.module";
import { handleRequestError, getMimeType } from "../../utilities/utilities.module";
import { imageOptionsValidator } from "../../middlewares/middlewares.module";

const images = express.Router();

images.get("/", imageOptionsValidator, async (req, res) => {
  const options = getImageOptionsFromQuery(req);
  try {
    const thumbPath = await getThumbPath(options);
    const type = getMimeType(options.format);
    res.type(type);
    fs.createReadStream(thumbPath as fs.PathLike).pipe(res);
  } catch (error) {
    handleRequestError(res, error as Error);
  }
});

export default images;
