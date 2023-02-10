const ACCOUNT_NAME = 'account';

const localStorage = name => {
  return {
    name,
    get item() {
      const item = getItem(this.name);
      return JSON.parse(item);
    },
    setItem(item) {
      setItem(this.name, item);
    }
  };
};

const localStorageAccount = localStorage(ACCOUNT_NAME);

export { localStorageAccount };

function getItem(name) {
  return window.localStorage.getItem(name);
}

function setItem(name, item) {
  window.localStorage.setItem(name, JSON.stringify(item));
}
