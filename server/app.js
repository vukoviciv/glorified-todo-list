import config from './config/envs.js';
import express from 'express';
import routes from './src/routes/router.js';

const { protocol, ip, port, apiPath } = config;

const address = `${protocol}://${ip}:${port}`;

const app = express();

app
  .use(apiPath, routes)
  .listen(port, () => {
    console.log(`Listening on ${address}`);
  });
