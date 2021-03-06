import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import axios from 'axios';
import { render, screen, waitFor } from '../test_helpers/test.utils';
import AddMemberModal from '../components/AddMemberModal';
import configureTestStore from '../test_helpers/configureStore';
import {
  ADD_MEMBER,
  SET_MESSAGE,
  SHOW_ADD_MEMBER_MODAL,
} from '../actions/types';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
test('renders the Add Member component and it functions correctly: success scenario', async () => {
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
  const name = 'Ryan Giggs';
  const company = 'Manchester United';
  const status = 'Closed';
  const notes = 'Most matches played';

  const member = {
    name,
    company,
    status,
    notes,
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };

  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/members`:
        return Promise.resolve({ data: member });
      default:
        return Promise.reject(new Error('An error occurred!'));
    }
  });

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  const { user: usr } = render(<AddMemberModal />, {
    store,
  });
  const addMemberModal = screen.getByTestId('add-member-container');
  expect(addMemberModal).toBeInTheDocument();

  expect(screen).toMatchSnapshot();
  const input = addMemberModal.querySelectorAll('.form-control');
  input[0].value = name;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = company;
  ReactTestUtils.Simulate.change(input[1]);

  input[2].value = status;
  ReactTestUtils.Simulate.change(input[2]);

  const textArea = screen.getByTestId('notes');
  textArea.value = notes;
  ReactTestUtils.Simulate.change(textArea);

  await usr.click(screen.getByTestId('submit-btn'));
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionAddMember = {
      type: ADD_MEMBER,
      payload: member,
    };

    const showAddMemberModal = {
      type: SHOW_ADD_MEMBER_MODAL,
      payload: { flag: false },
    };

    expect(dispatchSpy).toHaveBeenCalledWith(actionAddMember);
    expect(dispatchSpy).toHaveBeenCalledWith(showAddMemberModal);
  });
});

test('renders the Add Member component and it functions correctly: error scenario', async () => {
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
  const name = 'Ryan Giggs';
  const company = 'Manchester United';
  const status = 'Closed';
  const notes = 'Most matches played';

  const member = {
    name,
    company,
    status,
    notes,
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };

  const message = 'An error occurred!';

  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/members`:
        return Promise.reject(new Error(message));
      default:
        return Promise.resolve({ data: {} });
    }
  });

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  const { user: usr } = render(<AddMemberModal />, {
    store,
  });
  const addMemberModal = screen.getByTestId('add-member-container');
  expect(addMemberModal).toBeInTheDocument();

  expect(screen).toMatchSnapshot();
  const input = addMemberModal.querySelectorAll('.form-control');
  input[0].value = name;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = company;
  ReactTestUtils.Simulate.change(input[1]);

  input[2].value = status;
  ReactTestUtils.Simulate.change(input[2]);

  const textArea = screen.getByTestId('notes');
  textArea.value = notes;
  ReactTestUtils.Simulate.change(textArea);

  await usr.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionAddMember = {
      type: ADD_MEMBER,
      payload: member,
    };

    const showAddMemberModal = {
      type: SHOW_ADD_MEMBER_MODAL,
      payload: { flag: false },
    };

    const actionSetMessage = {
      type: SET_MESSAGE,
      payload: message,
    };

    expect(dispatchSpy).not.toHaveBeenCalledWith(actionAddMember);
    expect(dispatchSpy).not.toHaveBeenCalledWith(showAddMemberModal);
    expect(dispatchSpy).toHaveBeenCalledWith(actionSetMessage);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
