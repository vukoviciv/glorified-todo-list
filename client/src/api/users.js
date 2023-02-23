import { extractData } from '@/shared/api/utils';
import { main as request } from '@/shared/api/request';

const url = {
  root: '/users',
  get me() {
    return `${this.root}/me`;
  }
};

function getMe() {
  return request.get(url.me).then(extractData);
}

export default {
  getMe
};
