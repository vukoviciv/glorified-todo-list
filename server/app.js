import config from './config.js';
import express from 'express';

const { protocol, ip, port } = config;

const address = `${protocol}://${ip}:${port}`;

const app = express();

app.listen(port, () => {
  console.log(`Listening on ${address}`);
});
