import config from './config.js';
import express from 'express';
import routes from './routes/router.js';

const { protocol, ip, port, apiPath } = config;
const address = `${protocol}://${ip}:${port}`;

const app = express();

app.use(apiPath, routes);
app.get('/', (req, res) => {
  res.send('A mislia si da ne radi');
});
app.listen(port, () => {
  console.log(`Listening on ${address}`);
});
