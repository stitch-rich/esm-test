import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {parseInt} from 'lodash';
import { Apollo } from './apollo';
import { metaInformation } from './meta';

export async function startServer() {
  await Apollo.start();

  // Set up the express app
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.disable('x-powered-by');
  app.use(bodyParser.json({
    limit: '1mb',
  }));
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  // Apply server middleware for GraphQL
  const origins = process.env.CORS_ALLOWED_ORIGINS?.split(';') ?? [];
  if (origins.length === 0) {
    console.warn('No CORS origins specified - CORS_ALLOWED_ORIGINS needs setting.');
  }
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: origins,
    }),
    bodyParser.json(),
    expressMiddleware(Apollo)
  );

  // Add the meta route into the application
  metaInformation(app);

  // Start the server
  const listenPort = parseInt(process.env.PORT ?? '4000');
  const server = app.listen(
    {
      port: listenPort,
    },
    // eslint-disable-next-line no-console
    () => console.log(`🚀 Gateway ready at http://localhost:${ listenPort }`)
  );
  // The keep alive time on the target (i.e. this server) needs to be greater than the
  // idle timeout configured on the ELB (which is 60 seconds).
  server.keepAliveTimeout = 90 * 1000;
  // And the headersTimeout should be larger than the keep alive timeout.
  server.headersTimeout = server.keepAliveTimeout + 10000;

  const cleanup = () => {
    server.close();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  return server;
}
