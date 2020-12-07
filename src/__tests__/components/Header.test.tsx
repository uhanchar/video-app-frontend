import React from 'react';
import { fireEvent } from '@testing-library/react';

import { render as renderWithRedux } from 'test-utils';
import Header from 'components/Header/Header';
import { LocationPath } from 'constants/location-path.enum';
import { mockHistoryPush } from 'setupTests';

const title = 'Video app';

describe('test for Header component', () => {
  it('should render Header component', () => {
    const { asFragment } = renderWithRedux(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Loader title content', () => {
    const { getByTestId } = renderWithRedux(<Header />);

    expect(getByTestId('header')).toHaveTextContent(title);
  });

  it('should change url on upload video button click', () => {
    const { getByTestId } = renderWithRedux(<Header />);

    fireEvent.click(getByTestId('header-navigate-button'));

    expect(mockHistoryPush).toHaveBeenCalledWith(LocationPath.Upload);
  });
});
