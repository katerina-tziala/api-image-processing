import express, { Response, Request } from 'express';
import * as fs from 'fs';
import {
  getThumbPath,
  getImageOptionsFromQuery
} from '../../modules/images/images.module';
import {
  getErrorStatus,
  getResponseType
} from '../../utilities/utilities.module';
import { imageOptionsValidator } from '../../middlewares/middlewares.module';

const images = express.Router();

images.get(
  '/',
  imageOptionsValidator,
  async (req: Request, res: Response): Promise<void> => {
    const options = getImageOptionsFromQuery(req);
    try {
      const thumbPath = await getThumbPath(options);
      const type = getResponseType(options.format);
      res.type(type);
      fs.createReadStream(thumbPath as fs.PathLike).pipe(res);
    } catch (error) {
      const errorData = error as Error;
      const status = getErrorStatus(errorData);
      res.status(status).send(errorData.message);
    }
  }
);

export default images;
