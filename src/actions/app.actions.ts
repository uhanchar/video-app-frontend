import { createAsyncThunk } from '@reduxjs/toolkit';

import { LOAD_VIDEOS } from 'actions/types';
import { fetchVideos } from 'services/app.service';

export interface ILoadVideos {
  payload: string[];
}

export const loadVideos = createAsyncThunk(LOAD_VIDEOS, () => fetchVideos());
