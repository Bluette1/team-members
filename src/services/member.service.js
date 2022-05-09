import axios from 'axios';
import authHeader from './auth.header';
import { httpProtocol, host, port } from '../env.variables';

const baseURL = `${httpProtocol}://${host}:${port}/api`;

const createMember = (data, headers = authHeader()) =>
  axios.post(`${baseURL}/members`, data, { headers });

const getMembers = (headers = authHeader()) =>
  axios.get(`${baseURL}/members`, { headers });

const getMembersByUser = (id, headers = authHeader()) =>
  axios.get(`${baseURL}/users/${id}/members`, { headers });

const getMember = (id, headers = authHeader()) =>
  axios.post(`${baseURL}/members/${id}`, { headers });

const updateMember = (id, data, headers = authHeader()) =>
  axios.put(`${baseURL}/members/${id}`, data, { headers });

const deleteMember = (id, headers = authHeader()) =>
  axios.delete(`${baseURL}/members/${id}`, { headers });

export default {
  createMember,
  getMembers,
  getMembersByUser,
  getMember,
  updateMember,
  deleteMember,
};
