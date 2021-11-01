import express from 'express';
import cors from 'cors';


import routes from "./routes/index";

// .env, cross platoform, node env
const port = 3000;

const app = express();

app.use(cors());

app.use("/api", routes);

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server started at http://localhost:${port}`,
  );
});
