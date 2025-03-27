import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';

import { dataSource } from './database/client';
import { Hello } from './schemas/hello.schema';
import { getHello } from './resolvers/hello.resolver';

const typeDefs = `
  type Query {
      hello: String
  }

  type Hello ${Hello}
`;

const resolvers = {
  Query: {
    hello: getHello,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.info(`🚀 Server ready at ${url}`);
}

startServer();
