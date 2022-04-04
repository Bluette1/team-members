import http from '../http-common';

const register = (data) => http.post('/auth/signup', data);

const login = (data) => http.post('/auth/signin', data);

export default { register, login };
