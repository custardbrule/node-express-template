import { PaginateModel } from 'mongoose';
import database from './dbConnection';
import { clientSchema, clientSchemaName, ClientModel } from './schemas';

const ClientRepository = database.model<
  ClientModel,
  PaginateModel<ClientModel>
>(clientSchemaName, clientSchema);

export default ClientRepository;
