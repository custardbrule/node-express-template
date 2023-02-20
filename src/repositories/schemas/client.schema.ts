import { InferSchemaType, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const clientSchemaName = 'Client';

const clientSchema = new Schema({
  client_Id: String,
  client_Secrect: String,
  description: String,
  audience: [String],
  grant_type: [String],
});

type ClientModel = InferSchemaType<typeof clientSchema>;

clientSchema.plugin(paginate);

export { clientSchema, clientSchemaName, ClientModel };
