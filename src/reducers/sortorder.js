import { CHANGE_SORT_ORDER } from '../actions/types';

const initialState = { sortorder: '' };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SORT_ORDER:
      return { sortorder: payload };
    default:
      return state;
  }
}
