import axios from 'axios';
import { routes } from '@/shared/utils/navigation';
import { StatusCodes } from 'http-status-codes';

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
main.interceptors.response.use(res => res, err => {
  const isUnauthorized = err.response.status === StatusCodes.UNAUTHORIZED;
  if (isUnauthorized) document.location.replace(routes.auth);

  throw err;
});
const auth = axios.create(authConfig);

export { auth, main };
