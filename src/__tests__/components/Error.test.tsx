import React from 'react';

import { render as renderWithRedux } from 'test-utils';

import Error from 'components/Error/Error';

const errorMessage = 'Test error';

describe('test for Error component', () => {
  it('should render Error component', () => {
    const { asFragment } = renderWithRedux(<Error content={errorMessage} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render error message', () => {
    const { getByTestId } = renderWithRedux(<Error content={errorMessage} />);

    expect(getByTestId('error')).toHaveTextContent(errorMessage);
  });
});
