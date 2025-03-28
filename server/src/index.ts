import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import 'dotenv/config';

import { dataSource } from './database/client';
import { Hello } from './schemas/hello.schema';
import { getHello, createHello, getHelloById } from './resolvers/hello.resolver';

const typeDefs = `
  type Hello ${Hello}

  type Query {
    getHello: [Hello]
    getHelloById(id: ID!): Hello
  }
  type Mutation {
    createHello(message: String!): Hello
  }
`;

const resolvers = {
  Query: {
    getHello,
    getHelloById,
  },
  Mutation: {
    createHello,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT as string) || 4000 },
  });

  console.info(`🚀 Server ready at ${url}`);
}

startServer();
