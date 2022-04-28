import React from 'react';
import { render, screen } from '../test_helpers/renderWithStore';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import history from '../helpers/history';
import configureTestStore from '../test_helpers/configureStore';

jest.mock('axios');
test('renders the app - navbar links work correctly', async () => {
  const { user } = render(<App />);
  expect(screen.getByText(/team members/i)).toBeInTheDocument();

  expect(screen.getByTestId('login-container')).toBeInTheDocument();

  await user.click(screen.getByText(/register/i));

  expect(screen.getByText(/sign up/i)).toBeInTheDocument();
});

test('renders the app - home page displays correctly', async () => {
  const accessToken = 'token';

  const user = {
    id: 1,
    email: 'test@example.com',
    created_at: '2021-07-22 14:30:15.903533000 +0000',
    updated_at: '2021-07-22 14:30:15.903533000 +0000',
    members: [],
    accessToken,
  };

  const store = configureTestStore({
    auth: { user, isLoggedIn: true },
    member: user.members,
  });
  const { user: usr } = render(<App />, { store });
  expect(screen.getByText(/team members/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');

  await usr.click(screen.getByText(/add members/i));
  expect(screen.getByTestId('add-member-container')).toBeInTheDocument();
});
