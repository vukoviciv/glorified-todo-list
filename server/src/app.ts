import express, { Express, Router } from 'express';
import cookieParser from 'cookie-parser';
import { createRequestContextMw } from './routes/middlewares';
import { DIinterface } from './database';
import { envs } from '../config/index';

const { apiPath, protocol, ip, port } = envs.server;

const address = `${protocol}://${ip}:${port}`;

const app: Express = express();

export default function runServer(DI: DIinterface, router: Router) {
  const { requestContextMiddleware } = createRequestContextMw(DI);
  const middlewares = [
    cookieParser(),
    express.json(),
    requestContextMiddleware
  ];
  app
    .use(middlewares)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
