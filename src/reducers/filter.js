import { CHANGE_FILTER } from '../actions/types';

const initialState = [
  'LA Galaxy',
  'Manchester United',
  'DC United',
  'Liverpool',
  'Bayern Munich',
];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_FILTER:
      return payload;
    default:
      return state;
  }
}
