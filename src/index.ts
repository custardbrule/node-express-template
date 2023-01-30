import * as env from 'dotenv';
env.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import { applyWinstonLogging } from './middlewares';
import { white_list } from './config';
import useController from './controllers';

const environment = process.env.NODE_ENV || 'development';

const app = express();
const port = process.env.PORT;

applyWinstonLogging(app);

app.use(
  cors({
    origin: [`http://localhost:${port}`, ...white_list],
  }),
);

app.get('/', (_req, res) => {
  res.send('hello world');
});

useController(app);

app.listen(port, () => {
  if (environment === 'development')
    console.log(`app listening on localhost:${port}`);
  else console.log(`app listening on port ${port}`);
});
