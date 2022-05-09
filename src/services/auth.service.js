import axios from 'axios';
import { httpProtocol, host, port } from '../env.variables';

const baseURL = `${httpProtocol}://${host}:${port}/api`;

const register = (data) => axios.post(`${baseURL}/auth/signup`, data);

const login = (data) => axios.post(`${baseURL}/auth/signin`, data);

export default { register, login };
