import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { envs } from '../config/index';
import { requestContextMiddleware } from './routes/middlewares/index';
import router from './routes/router';

const { apiPath, protocol, ip, port } = envs.server;

const address = `${protocol}://${ip}:${port}`;
const middlewares = [
  cookieParser(),
  express.json(),
  requestContextMiddleware
];

const app: Express = express();

export default function runServer() {
  app
    .use(middlewares)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
