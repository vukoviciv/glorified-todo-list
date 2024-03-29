const locations = {
  AUTH: 'auth',
  ORIGIN: 'origin',
  TODAY: 'today',
  WEEK: 'week',
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  UPDATE_PASSWORD: 'password',
  CREATE_ACCOUNT: 'create-account'
};

const routes = {
  [locations.ORIGIN]: document.location.origin,
  get auth() {
    return `${this[locations.ORIGIN]}/${locations.AUTH}/`;
  },
  get home() {
    return `${this[locations.ORIGIN]}/#/${locations.TODAY}/`;
  },
  get createAccount() {
    return `${this[locations.ORIGIN]}#/${locations.CREATE_ACCOUNT}`;
  },
  get logout() {
    return `${this[locations.AUTH]}#/${locations.LOGOUT}`;
  },
  get login() {
    return `${this[locations.AUTH]}#/${locations.LOGIN}`;
  },
  get register() {
    return `${this[locations.AUTH]}#/${locations.REGISTER}`;
  },
  get updatePassword() {
    return `${this[locations.AUTH]}#/${locations.UPDATE_PASSWORD}`;
  }
};

export { routes };
