import express from 'express';

const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server started at http://localhost:${port}`,
  );
});
