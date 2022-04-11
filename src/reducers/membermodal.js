import { SHOW_ADD_MEMBER_MODAL } from '../actions/types';

const initialState = { showAddMemberModal: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ADD_MEMBER_MODAL:
      return {
        ...state,
        showAddMemberModal: payload.flag,
      };
    default:
      return state;
  }
}
