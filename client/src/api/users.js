import { extractData } from '@/shared/api/utils';
import { main as request } from '@/shared/api/request';

const url = {
  root: '/users',
  get me() {
    return `${this.root}/me`;
  },
  get createAccounts() {
    return `${this.me}/accounts`;
  }
};

function getMe() {
  return request.get(url.me).then(extractData);
}

function createAccounts(data) {
  return request.post(url.createAccounts, data).then(extractData);
}

export default {
  getMe,
  createAccounts
};
