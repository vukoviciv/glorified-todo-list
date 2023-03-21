import express, { Express, Router } from 'express';
import cookieParser from 'cookie-parser';
import { envs } from '../config/index';
import { requestContextMiddleware } from './routes/middlewares';

const { apiPath, protocol, ip, port } = envs.server;

const address = `${protocol}://${ip}:${port}`;
const middlewares = [
  cookieParser(),
  express.json(),
  requestContextMiddleware
];

const app: Express = express();

export default function runServer(router: Router) {
  app
    .use(middlewares)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
