import express, { Express } from 'express';
import { envs } from '../config/index';
import { requestContextMiddleware } from './routes/middlewares/index';
import router from './routes/router';

const { apiPath, protocol, ip, port } = envs.server;
const address = `${protocol}://${ip}:${port}`;

const app: Express = express();

export default function runServer() {
  app.use(express.json())
    .use(requestContextMiddleware)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
