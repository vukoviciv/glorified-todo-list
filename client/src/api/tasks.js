import { extractData } from '@/shared/api/utils';
import request from '@/shared/api/request';

const url = {
  root: '/task'
};

function fetch(params = {}) {
  return request.get(url.root, { params }).then(extractData);
}

export default {
  fetch
};
