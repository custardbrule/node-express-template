import { InferSchemaType, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const gameLogSchemaName = 'GameLog';

const gameLogSchema = new Schema({
  user_id: String,
  title: String,
  game_type: String,
  detail: String,
  date_created: Date,
});

type GameLogModel = InferSchemaType<typeof gameLogSchema>;

gameLogSchema.plugin(paginate);

export { gameLogSchema, gameLogSchemaName, GameLogModel };
