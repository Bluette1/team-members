import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import axios from 'axios';
import { render, waitFor, screen } from '../test_helpers/test.utils';
import 'jest-localstorage-mock';
import history from '../helpers/history';
import Login from '../components/Register';
import configureTestStore from '../test_helpers/configureStore';
import { httpProtocol, host, port } from '../env.variables';
import {
  CLEAR_MESSAGE,
  LOGIN_SUCCESS,
  REGISTER_MEMBERS,
} from '../actions/types';

jest.mock('axios');

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('renders the Register form and it functions correctly', async () => {
  const accessToken = 'token';
  const user = {
    id: 1,
    email: 'jose.mourinho@united.com',
    created_at: '2021-07-22 14:30:15.903533000 +0000',
    updated_at: '2021-07-22 14:30:15.903533000 +0000',
    members: [],
    accessToken,
  };

  const username = 'Jose Mourinho';
  const email = 'jose.mourinho@united.com';
  const password = 'passwordNew123';
  const store = configureTestStore();
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/auth/signup`:
        return Promise.resolve({
          data: user,
        });
      default:
        return Promise.reject(new Error('An error occurred!'));
    }
  });

  const { user: usr } = render(<Login />, { store });
  const loginContainer = screen.getByTestId('register-container');
  const input = loginContainer.querySelectorAll('.form-control');
  expect(screen).toMatchSnapshot();
  input[0].value = username;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = email;
  ReactTestUtils.Simulate.change(input[1]);

  input[2].value = password;
  ReactTestUtils.Simulate.change(input[2]);
  await usr.click(screen.getByTestId('submit-btn'));
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionloggedIn = {
      payload: { user },
      type: LOGIN_SUCCESS,
    };

    const actionClearMessage = {
      type: CLEAR_MESSAGE,
    };

    const actionRegisterMembers = {
      type: REGISTER_MEMBERS,
      payload: user.members,
    };

    expect(dispatchSpy).toHaveBeenCalledWith(actionloggedIn);
    expect(dispatchSpy).toHaveBeenCalledWith(actionClearMessage);
    expect(dispatchSpy).toHaveBeenCalledWith(actionRegisterMembers);

    expect(history.location.pathname).toBe('/');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(user),
    );
  });
});
