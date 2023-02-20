import { InferSchemaType, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const tokenSchemaName = 'Token';

const tokenSchema = new Schema({
  client_Id: String,
  payload: Schema.Types.Mixed,
});

type TokenModel = InferSchemaType<typeof tokenSchema>;

tokenSchema.plugin(paginate);

export { tokenSchema, tokenSchemaName, TokenModel };
