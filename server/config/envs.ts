import { PathParams } from 'express-serve-static-core';

type Envs = {
  server: {
    hostname?: string,
    apiPath: PathParams,
    ip?: string,
    port?: string,
    protocol?: string,
  },
  database: {
    name?: string,
    debug?: boolean,
    type?: string,
    uri?: string
  }
}

const databaseUri = resolveDatabaseUri();

export const envs: Envs = {
  server: {
    hostname: process.env.HOSTNAME,
    apiPath: process.env.API_PATH as PathParams,
    ip: process.env.IP,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL
  },
  database: {
    debug: process.env.DATABASE_DEBUG as unknown as boolean,
    name: process.env.DATABASE_NAME,
    uri: databaseUri || process.env.DATABASE_URI
  }
};

function resolveDatabaseUri(): string {
  const {
    DATABASE_TYPE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME
  } = process.env;
  return `${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
}
