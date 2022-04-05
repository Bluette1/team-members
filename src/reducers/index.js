import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import member from './member';

export default combineReducers({
  auth,
  message,
  member,
});
