import { createAsyncThunk } from '@reduxjs/toolkit';

import { LOAD_VIDEOS } from 'actions/types';
import { fetchVideos } from 'services/app.service';
import { IVideoItem } from 'reducers/types';

export interface ILoadVideos {
  payload: IVideoItem[];
}

export const loadVideos = createAsyncThunk(LOAD_VIDEOS, () => fetchVideos());
