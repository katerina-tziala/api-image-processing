import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (_, res) => {
  res.status(200).send('API is listening...');
});

routes.use('/images', images);

export default routes;
