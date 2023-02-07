const locations = {
  AUTH: 'auth',
  ORIGIN: 'origin',
  TODAY: 'today',
  WEEK: 'week'
};

const routes = {
  [locations.ORIGIN]: document.location.origin,
  get auth() {
    return `${this[locations.ORIGIN]}/${locations.AUTH}/`;
  },
  get main() {
    return `${this[locations.ORIGIN]}/#/${locations.TODAY}/`;
  }
};

export { routes };
