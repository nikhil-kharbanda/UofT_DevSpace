const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas')
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx
});

const PORT = process.env.PORT || 8000;

server.applyMiddleware({ app });


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  