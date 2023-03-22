import createMiddlewares from './src/routes/middlewares';
import { dbInit } from './src/database/index';
import initRouter from './src/routes';
import runServer from './src/app';

dbInit()
  .then(db => {
    const router = initRouter(db);
    return { db, router };
  })
  .then(({ db, router }) => {
    const appMiddlewares = createMiddlewares(db);
    runServer(appMiddlewares, router);
  })
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
