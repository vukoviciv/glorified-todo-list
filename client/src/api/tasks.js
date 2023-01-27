import { extractData } from '@/shared/api/utils';
import request from '@/shared/api/request';

const url = {
  root: '/tasks',
  update: id => `${url.root}/${id}`
};

function fetch(params = {}) {
  return request.get(url.root, { params }).then(extractData);
}

function create(data) {
  return request.post(url.root, data).then(extractData);
}

function update(data) {
  const { id } = data;
  return request.patch(url.update(id), data).then(extractData);
}

export default {
  create,
  fetch,
  update
};
