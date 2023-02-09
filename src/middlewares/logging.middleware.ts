import winston from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';
import expressWinston from 'express-winston';
import { Express, Request, Response } from 'express';
import { transportConsole, transportFile, transportMongoDb } from '../services';

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.label({ label: '[LOGGER]' }),
  winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
  winston.format.json(),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}
            meta: ${JSON.stringify(info.meta, null, 2)}`,
  ),
);

function applyWinstonLogging(app: Express): void {
  const logger = expressWinston.logger({
    transports: [transportConsole, transportFile, transportMongoDb],
    format: format,
    meta: false,
    msg: 'HTTP  ',
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (_req: Request, _res: Response) {
      return false;
    },
  });

  app.use(logger);
}

function applyWinstonErrorLogging(app: Express): void {
  const logger = expressWinston.errorLogger({
    transports: [transportConsole, transportFile, transportMongoDb],
    format: format,
    meta: true,
  });

  app.use(logger);
}

export { applyWinstonLogging, applyWinstonErrorLogging };
