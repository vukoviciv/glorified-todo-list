const ACCOUNT_NAME = 'account';

const localStorage = name => {
  return {
    name,
    get item() {
      const item = getItem(this.name);
      return JSON.parse(item);
    },
    setItem(item) {
      window.localStorage.setItem(this.name, JSON.stringify(item));
    },
    clear() {
      window.localStorage.removeItem(this.name);
    }
  };
};

const localStorageAccount = localStorage(ACCOUNT_NAME);

export { localStorageAccount };

function getItem(name) {
  return window.localStorage.getItem(name);
}
