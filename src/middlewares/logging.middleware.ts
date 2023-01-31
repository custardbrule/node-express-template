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
        winston.format.colorize({ all: true }),
        winston.format.label({ label: '[LOGGER]' }),
        winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.printf(
          (info) =>
            ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}
            meta: ${JSON.stringify(info.meta, null, 2)}`,
        ),
      ),
      meta: true,
      msg: 'HTTP  ',
      expressFormat: true,
      colorize: true,
      ignoreRoute: function (_req: Request, _res: Response) {
        return false;
      },
    }),
  );
}
