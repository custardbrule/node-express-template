const typeDefs = `
    type List {
        name: String
        todos: [Todo]
    }

    type Query {
        lists: [List]
    }

    schema {
        query: Query
    }
`;

export { typeDefs };
