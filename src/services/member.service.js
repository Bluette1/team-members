import http from '../http-common';
import authHeader from './auth.header';

const headers = authHeader();

const createMember = (data) => http.post('/members', data, { headers });

const getMembers = () => http.get('/members', { headers });

const getMembersByUser = (id) => http.get(`/users/${id}/members`, { headers });

const getMember = (id) => http.post(`/members/${id}`, { headers });

const updateMember = (id, data) =>
  http.put(`/members/${id}`, data, { headers });

const deleteMember = (id, data) =>
  http.put(`/members/${id}`, data, { headers });

export default {
  createMember,
  getMembers,
  getMembersByUser,
  getMember,
  updateMember,
  deleteMember,
};
