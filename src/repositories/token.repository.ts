import { PaginateModel } from 'mongoose';
import database from './dbConnection';
import { tokenSchema, tokenSchemaName, TokenModel } from './schemas';

const TokenRepository = database.model<TokenModel, PaginateModel<TokenModel>>(
  tokenSchemaName,
  tokenSchema,
);

export default TokenRepository;
