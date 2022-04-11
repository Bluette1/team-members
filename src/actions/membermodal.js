import { SHOW_ADD_MEMBER_MODAL } from './types';

const showMemberModal = (payload) => ({
  type: SHOW_ADD_MEMBER_MODAL,
  payload,
});

export default showMemberModal;
