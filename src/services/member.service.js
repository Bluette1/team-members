import http from '../http-common';
import authHeader from './auth.header';

const createMember = (data, headers = authHeader()) =>
  http.post('/members', data, { headers });

const getMembers = (headers = authHeader()) =>
  http.get('/members', { headers });

const getMembersByUser = (id, headers = authHeader()) =>
  http.get(`/users/${id}/members`, { headers });

const getMember = (id, headers = authHeader()) =>
  http.post(`/members/${id}`, { headers });

const updateMember = (id, data, headers = authHeader()) =>
  http.put(`/members/${id}`, data, { headers });

const deleteMember = (id, headers = authHeader()) =>
  http.delete(`/members/${id}`, { headers });

export default {
  createMember,
  getMembers,
  getMembersByUser,
  getMember,
  updateMember,
  deleteMember,
};
