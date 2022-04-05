import { REGISTER_MEMBERS, REMOVE_MEMBER } from '../actions/types';

const removeMember = (id, state) => {
  const membersUpdated = state.filter((item) => item.id !== id);
  return membersUpdated;
};

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_MEMBERS:
      return payload;
    case REMOVE_MEMBER:
      return removeMember(payload.id, state);
    default:
      return state;
  }
}
