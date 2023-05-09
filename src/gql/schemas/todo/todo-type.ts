const typeDefs = `
    type Todo {
        name: String
    }

    type Query {
        todos: [Todo]
    }

    schema {
        query: Query
    }
`;

export { typeDefs };
