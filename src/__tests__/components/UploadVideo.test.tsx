import React from 'react';
import { screen, fireEvent, queryByAttribute, waitFor } from '@testing-library/react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import { render as renderWithRedux } from 'test-utils';
import UploadVideo from 'components/UploadVideo/UploadVideo';
import { RootState } from 'reducers/types';
import rootReducer from 'reducers';
import { CustomAny } from 'constants/data-types';
import { ErrorMessages } from 'constants/error-messages.enum';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const initialState: RootState = {
  video: {
    video: null,
    isLoading: false,
    error: '',
  },
  app: {
    videos: [],
  },
};

let store: CustomAny;

const getById = queryByAttribute.bind(null, 'id');

const returnEvent = (value: string) => ({
  preventDefault() {},
  target: { value },
});

const returnFileInputEvent = (file: File | null) => ({
  target: {
    files: {
      item: jest.fn().mockImplementationOnce(() => file),
    },
  },
});

describe('test for UploadVideo component', () => {
  beforeEach(() => {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Upload Video component', () => {
    const { asFragment } = renderWithRedux(<UploadVideo />, { initialState, store });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should update file title on input', () => {
    const { container } = renderWithRedux(<UploadVideo />, { initialState, store });
    const input = getById(container as HTMLElement, 'video-title');
    const valueInput = 'test-title';

    fireEvent.change(input!, returnEvent(valueInput));

    expect(screen.getByDisplayValue(valueInput)).toBeInTheDocument();
  });

  it('should update file description on input', () => {
    const { container } = renderWithRedux(<UploadVideo />, { initialState, store });
    const input = getById(container as HTMLElement, 'description');
    const valueInput = 'test-description';

    fireEvent.change(input!, returnEvent(valueInput));

    expect(screen.getByDisplayValue(valueInput)).toBeInTheDocument();
  });

  it('should add new file on file input change', () => {
    const { getByTestId } = renderWithRedux(<UploadVideo />, { initialState, store });
    const testFileName = 'test.mpeg4';
    const file = new File([ 'test' ], testFileName, { type: 'video/mpeg4' });
    const fileInput = getByTestId('file-input');

    fireEvent.change(fileInput, returnFileInputEvent(file));

    expect(getByTestId('file-name')).toHaveTextContent(testFileName);
  });

  it('should not change anything if no file exist', () => {
    const { getByTestId } = renderWithRedux(<UploadVideo />, { initialState, store });
    const fileInput = getByTestId('file-input');

    fireEvent.change(fileInput, returnFileInputEvent(null));

    expect(getByTestId('file-name')).toHaveTextContent('');
  });

  it('should show error message if file format is not valid', () => {
    const { getByTestId } = renderWithRedux(<UploadVideo />, { initialState, store });

    const file = new File([ 'test' ], 'test.png', { type: 'image/png' });
    const fileInput = getByTestId('file-input');

    fireEvent.change(fileInput, returnFileInputEvent(file));

    expect(getByTestId('error')).toHaveTextContent(ErrorMessages.WRONG_FILE_FORMAT_MESSAGE);
  });

  it('should send file data on submit button click', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve());
    const { getByTestId, container } = renderWithRedux(<UploadVideo />, { initialState, store });

    const file = new File([ 'test' ], 'test.mpeg4', { type: 'video/mpeg4' });
    const fileInput = getByTestId('file-input');
    const fileTitleInput = getById(container as HTMLElement, 'video-title');
    const valueInput = 'test-title';

    fireEvent.change(fileTitleInput!, returnEvent(valueInput));
    fireEvent.change(fileInput, returnFileInputEvent(file));
    fireEvent.click(getByTestId('file-submit'));

    await waitFor(() => getByTestId('close-confirmation'));

    expect(getByTestId('close-confirmation')).toBeInTheDocument();
  });

  it('should show error message if file submit fails', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.reject(ErrorMessages.GENERIS_SERVER_ERROR_MESSAGE));
    const { getByTestId, container } = renderWithRedux(<UploadVideo />, { initialState, store });

    const file = new File([ 'test' ], 'test.mpeg4', { type: 'video/mpeg4' });
    const fileInput = getByTestId('file-input');
    const fileTitleInput = getById(container as HTMLElement, 'video-title');
    const valueInput = 'test-title';

    fireEvent.change(fileTitleInput!, returnEvent(valueInput));
    fireEvent.change(fileInput, returnFileInputEvent(file));
    fireEvent.click(getByTestId('file-submit'));

    await waitFor(() => getByTestId('error'));

    expect(getByTestId('error')).toHaveTextContent(ErrorMessages.GENERIS_SERVER_ERROR_MESSAGE);
  });
});
