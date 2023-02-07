type Auth = {
  cookie: {
    name: string
  },
  jwt: {
    key: string
  }
}

export const auth: Auth = {
  cookie: {
    name: process.env.AUTH_COOKIE_NAME as string
  },
  jwt: {
    key: process.env.AUTH_JWT_KEY as string
  }
};
