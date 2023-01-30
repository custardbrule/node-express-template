import winston from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';
import expressWinston from 'express-winston';
import { Express, Request, Response } from 'express';
import { transportFile } from '../services';
import { defaultLevel } from '../config';

export function applyWinstonLogging(app: Express): void {
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console(),
        transportFile,
        new winston.transports.MongoDB({
          level: defaultLevel,
          db: process.env.MONGODB_CONNSTRING,
          collection: 'logs',
          capped: true,
          metaKey: 'meta',
        }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      meta: false,
      msg: 'HTTP  ',
      expressFormat: true,
      colorize: false,
      ignoreRoute: function (_req: Request, _res: Response) {
        return false;
      },
    }),
  );
}
