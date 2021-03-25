const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    title: String
    status: String
    lastUpdatedAt: String
    createdAt: String
  }

  type Query {
    todos: [Todo]
    create
  }
`;

const resolvers = {
  Query: {
    get: () => todos,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Listening on ${url}`);
});
