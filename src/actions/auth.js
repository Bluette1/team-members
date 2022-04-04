import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFail = () => ({
  type: REGISTER_FAIL,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');

  dispatch({
    type: LOGOUT,
  });
  return Promise.resolve();
};
