import config from './config.js';
import express from 'express';

const { port } = config;

const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
