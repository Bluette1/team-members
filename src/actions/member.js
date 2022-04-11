import { REGISTER_MEMBERS, REMOVE_MEMBER, ADD_MEMBER } from './types';

const registerMembers = (members) => ({
  type: REGISTER_MEMBERS,
  payload: members,
});

export const addMember = (member) => ({
  type: ADD_MEMBER,
  payload: member,
});

export const removeMember = (member) => ({
  type: REMOVE_MEMBER,
  payload: member,
});

export default registerMembers;
