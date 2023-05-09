const resolvers = {
  Query: {
    lists() {
      return [{ name: 'asda' }];
    },
  },

  List: {
    todos() {
      return [{ name: 'asda' }];
    },
  },
};

export { resolvers };
