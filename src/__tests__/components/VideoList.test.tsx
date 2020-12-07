import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'reducers';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import thunk from 'redux-thunk';

import { render as renderWithRedux } from 'test-utils';
import VideoList from 'components/VideoList/VideoList';
import { IVideoItem, RootState } from 'reducers/types';
import { CustomAny } from 'constants/data-types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const videoItems: IVideoItem[] = [
  {
    id: '39432ff1585cfb0ed1803ccea2929341',
    name: 'enem2',
    description: '',
    link: 'media/videos/39432ff1585cfb0ed1803ccea2929341',
    thumbnailLink: 'media/thumbnails/39432ff1585cfb0ed1803ccea2929341.png',
    createdAt: new Date(),
  },
  {
    id: '4e4682ecadd48d6bb20b9806b7e522bc',
    name: 'Long',
    description: '',
    link: 'media/videos/4e4682ecadd48d6bb20b9806b7e522bc',
    thumbnailLink: 'media/thumbnails/4e4682ecadd48d6bb20b9806b7e522bc.png',
    createdAt: new Date(),
  },
];

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

describe('test for VideoList component', () => {
  beforeEach(() => {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render VideoList component', () => {
    const { asFragment } = renderWithRedux(<VideoList />, { initialState, store });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render proper amount of list items', async () => {
    await mockedAxios.get.mockImplementationOnce(() => Promise.resolve(videoItems));
    const { getAllByTestId } = renderWithRedux(<VideoList />, { initialState, store });

    await waitFor(() => getAllByTestId('video-item'));

    expect(getAllByTestId('video-item').length).toBe(videoItems.length);
  });
});
