import logger, {
  transportConsole,
  transportFile,
  transportMongoDb,
} from './logger.service';
import redis_client from './redis.service';

export {
  logger,
  transportFile,
  transportConsole,
  transportMongoDb,
  redis_client,
};
