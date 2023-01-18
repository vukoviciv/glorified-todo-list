import express, { Express } from 'express';
import database from './src/database/index';
import { envs } from './config/envs';
import { requestContextMiddleware } from './src/routes/middlewares/index';
import router from './src/routes/router';

const { protocol, ip, port, apiPath } = envs;

const address = `${protocol}://${ip}:${port}`;

const app: Express = express();

database.init()
  .then(() => {
    app
      .use(requestContextMiddleware)
      .use(apiPath, router);
    return app;
  })
  .then(app => {
    app.listen(port, () => {
      console.log(`Listening on ${address}`);
    });
  });
