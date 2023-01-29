import database from './dbConnection';
import { gameLogSchema, gameLogSchemaName } from './schemas';

const gameLogRepository = database.model(gameLogSchemaName, gameLogSchema);

export default gameLogRepository;
