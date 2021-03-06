import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import member from './member';
import filter from './filter';
import sortorder from './sortorder';
import membermodal from './membermodal';

export default combineReducers({
  auth,
  message,
  member,
  filter,
  sortorder,
  membermodal,
});
