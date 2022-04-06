import { CHANGE_SORT_ORDER } from './types';

const changeSortOrder = (filter) => ({
  type: CHANGE_SORT_ORDER,
  payload: filter,
});

export default changeSortOrder;
