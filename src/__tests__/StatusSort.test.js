import React from 'react';
import { render, screen, fireEvent } from '../test_helpers/renderWithStore';
import StatusSort from '../components/StatusSort';
import configureTestStore from '../test_helpers/configureStore';
import { CHANGE_SORT_ORDER } from '../actions/types';

test('renders the status sort component and it functions correctly', async () => {
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

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
  });
  render(<StatusSort />, {
    store,
  });
  const companyFilter = screen.getByTestId('status-filter');
  expect(companyFilter).toBeInTheDocument();

  expect(screen).toMatchSnapshot();
  const statuses = ['', 'ASC', 'DESC'];
  const options = screen.getAllByTestId('select-option');
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();

  fireEvent.change(screen.getByTestId('select'), {
    target: { value: statuses[0] },
  });
  expect(options[0].selected).toBeTruthy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();

  const actionSortOrder0 = {
    type: CHANGE_SORT_ORDER,
    payload: statuses[0],
  };

  const dispatchSpy = store.dispatch;
  expect(dispatchSpy).toHaveBeenCalled();
  expect(dispatchSpy).toHaveBeenCalledWith(actionSortOrder0);
  expect(screen).toMatchSnapshot();

  fireEvent.change(screen.getByTestId('select'), {
    target: { value: statuses[1] },
  });

  const actionSortOrder1 = {
    type: CHANGE_SORT_ORDER,
    payload: statuses[1],
  };

  expect(dispatchSpy).toHaveBeenCalledWith(actionSortOrder1);

  fireEvent.change(screen.getByTestId('select'), {
    target: { value: statuses[2] },
  });

  const actionSortOrder2 = {
    type: CHANGE_SORT_ORDER,
    payload: statuses[2],
  };

  expect(dispatchSpy).toHaveBeenCalledWith(actionSortOrder2);
  expect(screen).toMatchSnapshot();
});
