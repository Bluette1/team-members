import React from 'react';
import { render, screen } from '../test_helpers/renderWithStore';
import Home from '../containers/Home';
import configureTestStore from '../test_helpers/configureStore';

jest.mock('axios');
test('renders the home component correctly', async () => {
  const members = [
    {
      name: 'Wayne Rooney',
      company: 'DC United',
      status: 'Active',
      notes: 'Man Utd Highest scorer',
    },
    {
      name: 'Ryan Giggs',
      company: 'Manchester United',
      status: 'Closed',
      notes: 'Most matches played',
    },
    {
      name: 'Zlatan Ibrahimovich',
      company: 'LA Galaxy',
      status: 'Active',
      notes: "I am 'ZLATAN'",
    },
  ];
  const user = {
    id: 'id',
    username: 'Jose Mourinho',
    email: 'jose.mourinho@united.com',
    members,
    accessToken: 'token',
    createdAt: '2021-07-22 14:30:15.903533000 +0000',
    updatedAt: '2021-07-22 14:30:15.903533000 +0000',
  };
  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
    member: user.members,
  });
  render(<Home />, { store });
  expect(screen.getByTestId('company-filter')).toBeInTheDocument();
  expect(screen.getByTestId('status-filter')).toBeInTheDocument();
  expect(screen.getAllByTestId('member-item')).toHaveLength(3);
  expect(screen).toMatchSnapshot();
});
