import React from 'react';
import { render as renderWithRedux } from 'test-utils';

import App from 'components/App/App';

describe('test for App component', () => {
  it('should render App component', () => {
    const { asFragment } = renderWithRedux(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
