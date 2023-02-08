const NAME = 'account';

function getItem(name) {
  return window.localStorage.getItem(name);
}

function setItem(name, item) {
  window.localStorage.setItem(name, JSON.stringify(item));
}

const localStorageAccount = {
  name: NAME,
  get item() {
    const item = getItem(this.name);
    return JSON.parse(item);
  },
  setItem(item) {
    setItem(this.name, item);
  }
};

export { localStorageAccount };
