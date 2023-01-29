import { Schema } from 'mongoose';

const gameLogSchemaName = 'GameLog';

const gameLogSchema = new Schema({
  title: String,
  game_type: String,
  detail: String,
});

export { gameLogSchema, gameLogSchemaName };
