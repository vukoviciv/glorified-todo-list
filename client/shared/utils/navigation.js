const locations = {
  AUTH: 'auth',
  ORIGIN: 'origin',
  TODAY: 'today',
  WEEK: 'week',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

const routes = {
  [locations.ORIGIN]: document.location.origin,
  get auth() {
    return `${this[locations.ORIGIN]}/${locations.AUTH}/`;
  },
  get home() {
    return `${this[locations.ORIGIN]}/#/${locations.TODAY}/`;
  },
  get logout() {
    return `${this[locations.AUTH]}#/${locations.LOGOUT}`;
  },
  get login() {
    return `${this[locations.AUTH]}#/${locations.LOGIN}`;
  }
};

export { routes };
