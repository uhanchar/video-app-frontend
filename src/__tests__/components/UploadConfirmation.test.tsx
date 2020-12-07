import React from 'react';
import { fireEvent } from '@testing-library/react';

import { render as renderWithRedux } from 'test-utils';
import UploadConfirmation from 'components/UploadConfirmation/UploadConfirmation';

const closeSnackbar = jest.fn();

describe('test for UploadConfirmation component', () => {
  it('should render Loader component', () => {
    const { asFragment } = renderWithRedux(<UploadConfirmation isOpen closeSnackbar={closeSnackbar} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call closeSnackbar on close button click', () => {
    const { getByTestId } = renderWithRedux(<UploadConfirmation isOpen closeSnackbar={closeSnackbar} />);

    fireEvent.click(getByTestId('close-confirmation-button'));

    expect(closeSnackbar).toHaveBeenCalled();
  });
});
