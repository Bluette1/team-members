import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureTestStore from './configureStore';
import { Provider } from 'react-redux';

function render(
  ui,
  {
    preloadedState,
    store = configureTestStore(),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    user: userEvent,
    render: rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
