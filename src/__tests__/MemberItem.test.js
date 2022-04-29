import React from 'react';
import axios from 'axios';
import { render, screen } from '../test_helpers/renderWithStore';
import '@testing-library/jest-dom/extend-expect';
import MemberItem from '../components/MemberItem';
import configureTestStore from '../test_helpers/configureStore';
import { REMOVE_MEMBER } from '../actions/types';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');
test('renders the member item component correctly', async () => {
  const member = {
    name: 'Wayne Rooney',
    company: 'DC United',
    status: 'Active',
    notes: 'Man Utd Highest scorer',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };
  const id = 'id';
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
      case `${httpProtocol}://${host}:${port}/members/${id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  const { user: usr } = render(<MemberItem item={member} highlight />, {
    store,
  });
  await usr.click(screen.getByTestId('remove'));
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
