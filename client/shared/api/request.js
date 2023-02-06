import axios from 'axios';

const commonConfig = {
  headers: { 'Content-Type': 'application/json' }
};

const mainConfig = {
  baseURL: import.meta.env.VITE_API_PATH,
  ...commonConfig
};

const authConfig = {
  baseURL: import.meta.env.VITE_API_AUTH_PATH,
  ...commonConfig
};

const main = axios.create(mainConfig);
const auth = axios.create(authConfig);

export { auth, main };
