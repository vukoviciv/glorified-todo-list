import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { DIinterface } from './database';
import { envs } from '../config/index';
import { makeRouter } from './routes/router';
import { requestContextMiddleware } from './routes/middlewares';

const { apiPath, protocol, ip, port } = envs.server;

const address = `${protocol}://${ip}:${port}`;
const middlewares = [
  cookieParser(),
  express.json(),
  requestContextMiddleware
];

const app: Express = express();

export default function runServer(db: DIinterface) {
  const router = makeRouter(db);
  app
    .use(middlewares)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
