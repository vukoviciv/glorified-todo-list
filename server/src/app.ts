import express, { Express, Router } from 'express';
import { envs } from '../config/index';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

type Middleware = express.RequestHandler<ParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>[];

const { apiPath, protocol, ip, port } = envs.server;

const address = `${protocol}://${ip}:${port}`;

export default function runServer(middlewares: Middleware, router: Router) {
  const app: Express = express();

  return app
    .use(middlewares)
    .use(apiPath, router)
    .listen(port, () => console.log(`Listening on ${address}`));
}
