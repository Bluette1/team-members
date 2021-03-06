import React from 'react';
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureTestStore from './configureStore';
import { Provider } from 'react-redux';

function render(
  ui,
  { preloadedState, store = configureTestStore(), ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    user: userEvent,
    render: rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
export { render, screen, fireEvent, waitFor };
