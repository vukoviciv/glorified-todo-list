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
  get main() {
    return `${this[locations.ORIGIN]}/#/${locations.TODAY}/`;
  },
  get logout() {
    return `${this[locations.AUTH]}#/${locations.LOGOUT}`;
  }
};

export { routes };
