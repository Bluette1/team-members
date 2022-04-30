import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, fireEvent } from '../test_helpers/renderWithStore';
import CompanyFilter from '../components/CompanyFilter';
import configureTestStore from '../test_helpers/configureStore';
import { CHANGE_FILTER } from '../actions/types';

test('renders the Company Filter component and select `All` functions correctly', async () => {
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
  const { user: usr } = render(<CompanyFilter />, {
    store,
  });
  const companyFilter = screen.getByTestId('company-filter');
  expect(companyFilter).toBeInTheDocument();

  expect(screen).toMatchSnapshot();
  const checkboxes = companyFilter.querySelectorAll('.checkbox');
  await usr.click(screen.getByTestId('dropbtn'));

  ReactTestUtils.Simulate.change(checkboxes[0]);

  const dispatchSpy = store.dispatch;
  expect(dispatchSpy).toHaveBeenCalled();

  const actionDefaultFilter = {
    type: CHANGE_FILTER,
    payload: [
      'LA Galaxy',
      'Manchester United',
      'DC United',
      'Liverpool',
      'Bayern Munich',
    ],
  };

  expect(dispatchSpy).toHaveBeenCalledWith(actionDefaultFilter);

  const actionUnselectAllFilter = {
    type: CHANGE_FILTER,
    payload: [],
  };

  ReactTestUtils.Simulate.change(checkboxes[0]);
  expect(dispatchSpy).toHaveBeenCalledWith(actionUnselectAllFilter);
});

test('renders the Company Filter component and different options can be selected correctly correctly', async () => {
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
  const { user: usr } = render(<CompanyFilter />, {
    store,
  });
  const companyFilter = screen.getByTestId('company-filter');
  expect(companyFilter).toBeInTheDocument();

  expect(screen).toMatchSnapshot();
  const checkboxes = companyFilter.querySelectorAll('.checkbox');
  await usr.click(screen.getByTestId('dropbtn'));

  const dispatchSpy = store.dispatch;

  const actionChangeFilter = {
    type: CHANGE_FILTER,
    payload: [
      'LA Galaxy',
      'Manchester United',
      'DC United',
      'Liverpool',
      'Bayern Munich',
    ],
  };

  expect(dispatchSpy).toHaveBeenCalledWith(actionChangeFilter);

  const actionOptionFilter = {
    type: CHANGE_FILTER,
    payload: ['Bayern Munich'],
  };
  await fireEvent.click(checkboxes[0]);
  await fireEvent.click(checkboxes[5]);
  expect(dispatchSpy).toHaveBeenCalledWith(actionOptionFilter);
});
