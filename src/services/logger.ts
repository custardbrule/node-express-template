import winston from 'winston';
import 'winston-daily-rotate-file';

const transportFile = new winston.transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console(), transportFile],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

export { transportFile };
export default logger;
