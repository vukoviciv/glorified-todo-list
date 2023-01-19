type Envs = {
  apiPath: string,
  ip: string,
  port: string,
  protocol: string,
  clientUrl: string
}

export const envs: Envs = {
  apiPath: process.env.API_PATH || '/api',
  ip: process.env.IP || '127.0.0.1',
  port: process.env.PORT || '3000',
  protocol: process.env.PROTOCOL || 'http',
  clientUrl: 'postgres://:@localhost:5432/my-todo-list'
};

// TODO: rename this file; consider changing the structure and placement of config folder