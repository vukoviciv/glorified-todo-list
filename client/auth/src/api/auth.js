import { extractData } from '@/shared/api/utils';
import { auth as request } from '@/shared/api/request';

const url = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  updatePassword: '/update-password'
};

function login(data) {
  return request.post(url.login, data).then(extractData);
}

function logout() {
  return request.post(url.logout).then(extractData);
}

function register(data) {
  return request.post(url.register, data).then(extractData);
}

function updatePassword(data) {
  return request.patch(url.updatePassword, data).then(extractData);
}

export default {
  login,
  logout,
  register,
  updatePassword
};
