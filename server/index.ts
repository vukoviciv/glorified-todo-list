import { dbInit } from './src/database/index';
import initMiddlewares from './src/routes/middlewares';
import initRouter from './src/routes';
import runServer from './src/app';

dbInit()
  .then(db => ({
    db,
    router: initRouter(db)
  }))
  .then(({ db, router }) => {
    const middlewares = initMiddlewares(db);
    return runServer(middlewares, router);
  })
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
