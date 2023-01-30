import { Schema } from 'mongoose';

const gameLogSchemaName = 'GameLog';

const gameLogSchema = new Schema({
  user_id: String,
  title: String,
  game_type: String,
  detail: String,
});

export { gameLogSchema, gameLogSchemaName };
