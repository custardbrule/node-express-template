const resolvers = {
  Query: {
    todos() {
      return [{ name: 'asda' }];
    },
  },
};

export { resolvers };
