import applyErrorHandler from './error.handler.middleware';
import {
  applyWinstonLogging,
  applyWinstonErrorLogging,
} from './logging.middleware';
import applySwaggerDoc from './swagger.middleware';

export {
  applyWinstonLogging,
  applyWinstonErrorLogging,
  applyErrorHandler,
  applySwaggerDoc,
};
