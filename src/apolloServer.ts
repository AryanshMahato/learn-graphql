import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './Resolvers/PostResolver';
import { Application } from 'express';
import { UserResolver } from './Resolvers/UserResolver';

export const createApolloServer = async (app: Application) => {
  let apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req }) => ({ req }),
  });

  apolloServer.applyMiddleware({ app });
  return apolloServer;
};
