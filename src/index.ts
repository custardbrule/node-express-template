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
// import child_process from 'child_process';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';

bodyParserXml(bodyParser);
const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const app = express();
const port = process.env.PORT;

mongoose.set({
  strictQuery: true,
  'timestamps.createdAt.immutable': true,
  debug: {
    color: true,
  },
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.xml());

// set view engine
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

applyWinstonLogging(app);

if (isDev) applySwaggerDoc(app);

app.use(
  cors({
    origin: [`http://localhost:${port}`, ...white_list],
  }),
);

useController(app);

// applyErrorHandler(app);
applyWinstonErrorLogging(app);

app.listen(port, () => {
  if (isDev) {
    // const url = `http://localhost:${port}/swagger`;
    // const start =
    //   process.platform == 'darwin'
    //     ? 'open'
    //     : process.platform == 'win32'
    //     ? 'start'
    //     : 'xdg-open';
    // child_process.exec(start + ' ' + url);
    console.log(`app listening on http://localhost:${port}`);
  } else console.log(`app listening on port ${port}`);
});
