import * as env from 'dotenv';
env.config({ path: './.env' });
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import * as middlewares from '@server/middlewares';
import * as config from '@server/config';
import expressLayouts from 'express-ejs-layouts';
import { UseSocket } from './socket';
import helmet from 'helmet';
import http from 'http';
import '@extension/http.extension';
// import { UrlHelper } from './utils';

bodyParserXml(bodyParser);
const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const app = express();
const port = process.env.PORT;

// Helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

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

middlewares.applyWinstonLogging(app);

if (isDev) middlewares.applySwaggerDoc(app);

app.use(
  cors({
    origin: [`http://localhost:${port}`, ...config.white_list],
  }),
);

middlewares.applyController(app);

middlewares.applyWinstonErrorLogging(app);
middlewares.applyErrorHandler(app);

// use socket
// for testing purpose
app.get('/socket', (_req, _res) => {
  _res.sendFile(`${__dirname}/public/socket.html`);
});

const server = http.createServer(app);
server
  // config socket
  .applyFunction(UseSocket)
  // run app
  .listen(port, () => {
    console.log(`app listening on port ${port}`);
    // if (isDev) UrlHelper.OpenBrowser(`http://localhost:${port}/swagger`);
  });

export default server;
