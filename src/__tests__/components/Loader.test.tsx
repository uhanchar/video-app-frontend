import React from 'react';

import { render as renderWithRedux } from 'test-utils';
import Loader from 'components/Loader/Loader';

const size = 48;

describe('test for Loader component', () => {
  it('should render Loader component', () => {
    const { asFragment } = renderWithRedux(<Loader size={size} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Loader of proper size according to props', () => {
    const { getByTestId } = renderWithRedux(<Loader size={size} />);

    expect(getByTestId('loader')).toHaveStyle({ width: `${ size }px`, height: `${ size }px` });
  });
});
