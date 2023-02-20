import * as env from 'dotenv';
env.config({ path: './.env' });
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import * as middlewares from '@server/middlewares';
import * as config from '@server/config';
// import child_process from 'child_process';
import expressLayouts from 'express-ejs-layouts';

bodyParserXml(bodyParser);
const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const app = express();
const port = process.env.PORT;

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

export default app;
