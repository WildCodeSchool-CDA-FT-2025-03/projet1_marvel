import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import 'dotenv/config';

import { dataSource } from './database/client';
import { Hello } from './schemas/hello.schema';
import { getHello, createHello, getHelloById } from './resolvers/hello.resolver';
import { getGames } from './resolvers/game.resolver';
import { Game } from './schemas/game.schema';

const typeDefs = `
  type Hello ${Hello}
  type Game ${Game}

  type Query {
    getHello: [Hello]
    getHelloById(id: ID!): Hello
    getGames: [Game]
  }
  type Mutation {
    createHello(message: String!): Hello
  }
`;

const resolvers = {
  Query: {
    getHello,
    getHelloById,
    getGames,
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
