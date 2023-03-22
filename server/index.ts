import { dbInit } from './src/database/index';
import initRouter from './src/routes';
import runServer from './src/app';

dbInit()
  .then(db => ({ router: initRouter(db), db }))
  .then(({ db, router }) => runServer(db, router))
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
