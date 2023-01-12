import { extractData } from '../../shared/api/utils';
import request from '../../shared/api/request';

const url = {
  root: '/task'
};

function fetch() {
  return request.get(url.root).then(extractData);
}

export default {
  fetch
};
