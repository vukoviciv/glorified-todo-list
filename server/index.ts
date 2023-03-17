import database from './src/database/index';
import runServer from './src/app';

database
  .init()
  .then(db => runServer(db))
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
