import { extractData } from '@/shared/api/utils';
import request from '@/shared/api/request';

const url = {
  root: '/task'
};

function fetch(params = {}) {
  return request.get(url.root, { params }).then(extractData);
}

function create(data) {
  console.log({ data });
  return request.post(url.root, data).then(extractData);
}

export default {
  create,
  fetch
};
