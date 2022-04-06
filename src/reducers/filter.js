import { CHANGE_FILTER } from '../actions/types';

const initialState = { filter: '' };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_FILTER:
      return { filter: payload };
    default:
      return state;
  }
}
