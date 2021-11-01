import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (_, res) => {
  res.send('image processing api running');
});

routes.use('/images', images);

export default routes;
