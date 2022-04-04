import axios from 'axios';
import { httpProtocol, host, port } from './env.variables';

export default axios.create({
  baseURL: `${httpProtocol}://${host}:${port}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});
