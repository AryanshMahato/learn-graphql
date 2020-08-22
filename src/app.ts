import express from 'express';
import { createApolloServer } from './apolloServer';

const app = express();

// Creates a GraphQL Apollo Server
createApolloServer(app).then(() => console.log('Apollo Server Created'));

export default app;
