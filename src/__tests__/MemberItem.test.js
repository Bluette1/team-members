import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '../test_helpers/renderWithStore';
import '@testing-library/jest-dom/extend-expect';
import MemberItem from '../components/MemberItem';
import configureTestStore from '../test_helpers/configureStore';
import { REMOVE_MEMBER, SET_MESSAGE } from '../actions/types';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
test('renders the member item component correctly: success scenario', async () => {
  const id = 'id';
  const member = {
    id,
    name: 'Wayne Rooney',
    company: 'DC United',
    status: 'Active',
    notes: 'Man Utd Highest scorer',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };

  const user = {
    id,
    username: 'Jose Mourinho',
    email: 'jose.mourinho@united.com',
    members: [],
    accessToken: 'token',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/members/${id}`:
        return Promise.resolve();
      default:
        return Promise.reject(new Error('An error occurred!'));
    }
  });

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  const { user: usr } = render(<MemberItem item={member} highlight />, {
    store,
  });
  await usr.click(screen.getByTestId('remove'));
  await waitFor(() => {
    expect(screen.getByTestId('member-item')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemove = {
      type: REMOVE_MEMBER,
      payload: member,
    };

    expect(dispatchSpy).toHaveBeenCalledWith(actionRemove);
  });
});

test('renders the member item component correctly: error scenario', async () => {
  const id = 'id';
  const member = {
    id,
    name: 'Wayne Rooney',
    company: 'DC United',
    status: 'Active',
    notes: 'Man Utd Highest scorer',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };

  const user = {
    id,
    username: 'Jose Mourinho',
    email: 'jose.mourinho@united.com',
    members: [],
    accessToken: 'token',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };
  const message = 'An error occurred!';
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/members/${id}`:
        return Promise.reject(new Error(message));
      default:
        return Promise.resolve();
    }
  });

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  const { user: usr } = render(<MemberItem item={member} highlight />, {
    store,
  });
  await usr.click(screen.getByTestId('remove'));

  await waitFor(() => {
    expect(screen.getByTestId('member-item')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemove = {
      type: REMOVE_MEMBER,
      payload: member,
    };

    const actionSetMessage = {
      type: SET_MESSAGE,
      payload: message,
    };

    expect(dispatchSpy).not.toHaveBeenCalledWith(actionRemove);
    expect(dispatchSpy).toHaveBeenCalledWith(actionSetMessage);
  });
});
