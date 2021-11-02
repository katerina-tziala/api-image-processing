import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (_, res) => {
  //text
  res.status(200).send('Images API');
});

routes.use('/images', images);

export default routes;
