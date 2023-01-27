import express, { Express } from 'express';
import database from './src/database/index';
import { envs } from './config/index';
import { requestContextMiddleware } from './src/routes/middlewares/index';
import router from './src/routes/router';

const { protocol, ip, port, apiPath } = envs.server;

const address = `${protocol}://${ip}:${port}`;
const app: Express = express();

database
  .init()
  .then(() => {
    app
      .use(express.json())
      .use(requestContextMiddleware)
      .use(apiPath, router)
      .listen(port, () => {
        console.log(`Listening on ${address}`);
      });
  })
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
