import { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { typeDefs as todoType } from './schemas/todo/todo-type';
import { resolvers as todoResolver } from './schemas/todo/todo-resolver';
import { typeDefs as listType } from './schemas/list/list-type';
import { resolvers as listResolver } from './schemas/list/list-resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';

function UseGql(app: Express) {
  const typeDefs = [todoType, listType];
  const resolvers = [todoResolver, listResolver];
  const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

  app.use(
    '/graphql',
    graphqlHTTP({ schema: executableSchema, graphiql: true }),
  );
}

export default UseGql;
