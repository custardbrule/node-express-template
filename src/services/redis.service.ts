import { createClient } from 'redis';
import { logger } from './index';

const redis_client = createClient({ url: process.env.REDIS_CONNSTRING });

redis_client.on('error', (err) => {
  logger.log('crit', JSON.stringify(err));
});

export default redis_client;
