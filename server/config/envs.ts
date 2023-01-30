import { PathParams } from 'express-serve-static-core';

type Envs = {
  server: {
    hostname: string,
    apiPath: PathParams,
    ip: string,
    port: string,
    protocol: string,
  },
  database: {
    name: string,
    debug: boolean,
    uri?: string
  }
}

const databaseUri = resolveDatabaseUri();

export const envs: Envs = {
  server: {
    hostname: process.env.HOSTNAME as string,
    apiPath: process.env.API_PATH as PathParams,
    ip: process.env.IP as string,
    port: process.env.PORT as string,
    protocol: process.env.PROTOCOL as string
  },
  database: {
    debug: process.env.DATABASE_DEBUG as unknown as boolean,
    name: process.env.DATABASE_NAME as string,
    uri: databaseUri || process.env.DATABASE_URI
  }
};

function resolveDatabaseUri(): string {
  const {
    DATABASE_TYPE: type,
    DATABASE_HOST: host,
    DATABASE_USER: user,
    DATABASE_PASSWORD: pass,
    DATABASE_PORT: port,
    DATABASE_NAME: name
  } = process.env;
  return `${type}://${user}:${pass}@${host}:${port}/${name}`;
}
