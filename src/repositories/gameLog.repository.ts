import { PaginateModel } from 'mongoose';
import database from './dbConnection';
import { GameLogModel, gameLogSchema, gameLogSchemaName } from './schemas';

const gameLogRepository = database.model<
  GameLogModel,
  PaginateModel<GameLogModel>
>(gameLogSchemaName, gameLogSchema);

export default gameLogRepository;
