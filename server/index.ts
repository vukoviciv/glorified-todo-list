import database from './src/database/index';
import runServer from './src/app';

database
  .init()
  .then(() => runServer())
  .catch(err => {
    console.log(err, '🚨  Starting server failed');
    process.exit(1);
  });
