import express, { Response } from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', async (_, res: Response): Promise<void> => {
  res.status(200).send('API is listening...');
});

routes.use('/images', images);

export default routes;
