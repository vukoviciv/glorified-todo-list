import database from './src/database/index';
import initRouter from './src/routes';
import runServer from './src/app';

database.init()
  .then(db => initRouter(db))
  .then(router => runServer(router))
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
