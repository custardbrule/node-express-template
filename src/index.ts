import * as env from 'dotenv';
env.config({ path: './.env' });
import bodyParser from 'body-parser';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import {
  applyErrorHandler,
  applySwaggerDoc,
  applyWinstonLogging,
} from '@server/middlewares';
import { white_list } from '@server/config';
import useController from '@server/controllers';

const environment = process.env.NODE_ENV || 'development';

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

applyWinstonLogging(app);
applySwaggerDoc(app);

app.use(
  cors({
    origin: [`http://localhost:${port}`, ...white_list],
  }),
);

useController(app);

applyErrorHandler(app);

app.listen(port, () => {
  if (environment === 'development')
    console.log(`app listening on localhost:${port}`);
  else console.log(`app listening on port ${port}`);
});
