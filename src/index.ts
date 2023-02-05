import * as env from 'dotenv';
env.config({ path: './.env' });
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import {
  applySwaggerDoc,
  applyWinstonErrorLogging,
  applyWinstonLogging,
} from '@server/middlewares';
import { white_list } from '@server/config';
import useController from '@server/controllers';

bodyParserXml(bodyParser);
const environment = process.env.NODE_ENV || 'development';

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.xml());

applyWinstonLogging(app);
applySwaggerDoc(app);

app.use(
  cors({
    origin: [`http://localhost:${port}`, ...white_list],
  }),
);

useController(app);

// applyErrorHandler(app);
applyWinstonErrorLogging(app);

app.listen(port, () => {
  if (environment === 'development')
    console.log(`app listening on localhost:${port}`);
  else console.log(`app listening on port ${port}`);
});
