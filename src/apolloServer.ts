import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './Resolvers/PostResolver';
import { Application } from 'express';

export const createApolloServer = async (app: Application) => {
  let apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });
  return apolloServer;
};
