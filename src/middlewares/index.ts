import applyErrorHandler from './error.handler.middleware';
import { applyWinstonLogging } from './logging.middleware';
import applySwaggerDoc from './swagger.middleware';

export { applyWinstonLogging, applyErrorHandler, applySwaggerDoc };
