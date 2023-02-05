import { defaultLevel } from '@server/config';
import winston from 'winston';
import 'winston-daily-rotate-file';

const transportFile = new winston.transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  level: defaultLevel,
});

const transportConsole = new winston.transports.Console();

const transportMongoDb = new winston.transports.MongoDB({
  level: defaultLevel,
  db: process.env.MONGODB_CONNSTRING,
  collection: 'logs',
  capped: true,
  metaKey: 'meta',
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console(), transportFile],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  level: 'debug',
});

process.on('uncaughtException', (ex) => {
  logger.error(ex.message);
  logger.on('finish', () => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection: ' + reason);
  logger.on('finish', () => {
    process.exit(1);
  });
});

export { transportFile, transportConsole, transportMongoDb };
export default logger;
