import express from 'express';
import cors from 'cors';

import routes from './routes/index';

// .env, cross platoform, node env
// Add in logging to record when images are processed or accessed
// Write relevant unit tests with Jasmine and SuperTest to improve code quality and refactoring

// Test script runs and all tests created pass.
// There is at least 1 test per endpoint and at least one test for image processing.
const port = 3000;
const startedAt = new Date().toUTCString();

const app = express();

app.use(cors());

app.use('/api', routes);

app.get('/', (_, res) => {
  res.status(200).send(`Server started at ${startedAt}`);
});

app.listen(port, () => {
  // prettier-ignore
  // eslint-disable-next-line
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server started at http://localhost:${port}`
  );
});
