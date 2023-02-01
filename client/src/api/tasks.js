import { extractData, processId } from '@/shared/api/utils';
import request from '@/shared/api/request';

const url = {
  root: '/tasks',
  update: id => `${url.root}/${id}`,
  toggle: id => `${url.update(id)}/toggle`
};

function fetch(params = {}) {
  return request.get(url.root, { params }).then(extractData);
}

function create(data) {
  return request.post(url.root, data).then(extractData);
}

function update(data) {
  return request.patch(url.update(processId(data.id)), data).then(extractData);
}

function toggleDone(id) {
  return request.patch(url.toggle(processId(id))).then(extractData);
}

export default {
  create,
  fetch,
  update,
  toggleDone
};
