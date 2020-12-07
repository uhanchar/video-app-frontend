import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import { render as renderWithRedux } from 'test-utils';
import Video from 'components/Video/Video';
import { IVideoItem, RootState } from 'reducers/types';
import { CustomAny } from 'constants/data-types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const videoItem: IVideoItem = {
  id: '39432ff1585cfb0ed1803ccea2929341',
  name: 'enem2',
  description: '',
  link: 'media/videos/39432ff1585cfb0ed1803ccea2929341',
  thumbnailLink: 'media/thumbnails/39432ff1585cfb0ed1803ccea2929341.png',
  createdAt: new Date(),
};

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

const videoProps = {
  match: {
    params: {
      id: videoItem.id,
    },
  },
};

const errorMessage = 'Test error message';

let store: CustomAny;

describe('test for Video component', () => {
  beforeEach(() => {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Video component', () => {
    const { asFragment } = renderWithRedux(<Video {...videoProps} />, { initialState, store });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loader', () => {
    const { getAllByTestId } = renderWithRedux(<Video {...videoProps} />, { initialState, store });

    expect(getAllByTestId('loader').length).toBe(1);
  });

  it('should render video item name', async () => {
    await mockedAxios.get.mockImplementationOnce(() => Promise.resolve(videoItem));
    const { getByTestId } = renderWithRedux(<Video {...videoProps} />, { initialState, store });

    await waitFor(() => getByTestId('video-name'));

    expect(getByTestId('video-name')).toHaveTextContent(videoItem.name);
  });

  it('should render video item error', async () => {
    await mockedAxios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
    const { getByTestId } = renderWithRedux(<Video {...videoProps} />, { initialState, store });

    await waitFor(() => getByTestId('error'));

    expect(getByTestId('error')).toHaveTextContent(errorMessage);
  });
});
